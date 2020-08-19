import { App } from "@aws-cdk/core";
import {
  ContainerImage,
  NetworkMode,
  Ec2TaskDefinition,
  LogDriver,
  Ec2Service,
  ICluster
} from "@aws-cdk/aws-ecs";
import { Repository } from "@aws-cdk/aws-ecr";
import { RetentionDays } from "@aws-cdk/aws-logs";
import { IApplicationListener } from "@aws-cdk/aws-elasticloadbalancingv2";

import {
  EcsStack,
  IVpcLookup,
  registerServiceToListeners
} from "@rylabs/ry-cdk-tools/lib/ecs";
import { BaseStackProps } from "@rylabs/ry-cdk-tools/lib/core";
import { RyDatabaseInstance } from "@rylabs/ry-cdk-tools/lib/rds";

export interface AppStackProps extends BaseStackProps {
  readonly vpc: IVpcLookup;
  readonly databaseInstance: RyDatabaseInstance;
  readonly imageName: string;
  readonly fullDomain?: string;
}

export class AppStack extends EcsStack {
  constructor(scope: App, id: string, props: AppStackProps) {
    super(scope, id, props);

    const {
      imageName,
      fullDomain = this.loadBalancer.alb.loadBalancerDnsName,
      databaseInstance: {
        masterUsername,
        masterPassword,
        instanceEndpoint,
        databaseName
      }
    } = props;

    const repo = Repository.fromRepositoryName(this, "repository", imageName);
    const image = ContainerImage.fromEcrRepository(repo, "latest");
    const taskDefinition = new Ec2TaskDefinition(this, "taskDefinition", {
      family: this.conventions.eqn("camel"),
      networkMode: NetworkMode.BRIDGE
    });

    const protocol = this.loadBalancer.httpsListener ? "https://" : "http://"
    const browserBaseUrl = `${protocol}${fullDomain}/`
    
    const container = taskDefinition.addContainer("web", {
      image,
      memoryReservationMiB: 512,
      logging: LogDriver.awsLogs({
        streamPrefix: this.conventions.eqn("camel") || "",
        logRetention: RetentionDays.ONE_WEEK
      }),
      environment: {
        DATABASE_URL: `postgres://${masterUsername}:${masterPassword}@${instanceEndpoint.socketAddress}/${databaseName}`,
        BROWSER_BASE_URL: browserBaseUrl
      }
    });
    container.addPortMappings({
      containerPort: 3000
    });

    const service = new Ec2Service(this, "service", {
      taskDefinition,
      serviceName: "app",
      assignPublicIp: false,
      cluster: this.cluster
    });

    const listeners: IApplicationListener[] = [this.loadBalancer.httpListener];

    if (this.loadBalancer.httpsListener) {
      listeners.push(this.loadBalancer.httpsListener);
    }

    registerServiceToListeners(service, listeners, {
      hostHeader: fullDomain,
      targetGroupName: `${this.conventions.eqn()}-tg`
    });
  }
}
