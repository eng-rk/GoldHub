# Terraform ALB & Auto Scaling Group Assignment

This project implements a highly available, fault-tolerant web application infrastructure on AWS using Terraform. It features a custom VPC, Application Load Balancer, Auto Scaling Group, and a modern dynamic web page showcasing real-time EC2 metadata.

## Project Structure

```
terraform-alb-asg-assignment/
├── providers.tf          # AWS provider and backend configuration
├── backend.tf            # Backend configuration reference
├── variables.tf          # Input variables with defaults
├── main.tf               # Main infrastructure resources
├── outputs.tf            # Output values
├── index.html            # Pre-styled HTML template for web app
├── user_data.sh          # Bootstrap script for EC2 instances
└── README.md             # This file
```

## Architecture Overview

The infrastructure includes:

- **VPC**: Custom VPC with CIDR block `10.20.0.0/16`
- **Public Subnets**: Two public subnets across different Availability Zones (us-east-1a and us-east-1b)
- **Internet Gateway**: Provides internet connectivity for the VPC
- **Application Load Balancer**: Distributes traffic across EC2 instances
- **Auto Scaling Group**: Maintains 2 instances (min: 2, max: 4) across multiple AZs
- **Security Groups**: Enforce secure traffic flow between ALB and EC2 instances
- **EC2 Instances**: Amazon Linux 2 with Apache web server running the dynamic web application
- **IAM Role**: Allows EC2 instances to access AWS services

## Prerequisites

1. **AWS Account**: You must have an active AWS account with appropriate permissions
2. **Terraform**: Version 1.0 or higher installed on your machine
3. **AWS CLI**: Configured with your AWS credentials
4. **S3 Backend**: Create an S3 bucket and DynamoDB table for Terraform state management
5. **Git**: For version control (optional but recommended)

## Setup Instructions

### Step 1: Update Backend Configuration

Edit `providers.tf` and replace the placeholder values:

```hcl
backend "s3" {
  bucket         = "YOUR_S3_BUCKET_NAME"      # Replace with your bucket
  key            = "assignment/alb-asg/terraform.tfstate"
  region         = "us-east-1"
  encrypt        = true
  dynamodb_table = "YOUR_DYNAMODB_TABLE"      # Replace with your table
}
```

### Step 2: Initialize Terraform

```bash
terraform init
```

This command downloads the AWS provider and configures the S3 backend for state management.

### Step 3: Validate Configuration

```bash
terraform validate
```

Ensures all HCL syntax is correct.

### Step 4: Plan Deployment

```bash
terraform plan
```

Reviews the infrastructure changes Terraform will make. Save this output if you want to reference the resources being created.

### Step 5: Apply Configuration

```bash
terraform apply
```

Creates all AWS resources. Terraform will prompt you to confirm before creating resources.

### Step 6: Verify Deployment

After `terraform apply` completes, retrieve the ALB DNS name:

```bash
terraform output web_app_url
```

### Step 7: Test the Application

1. Open your web browser and navigate to the URL output from Step 6
2. You should see the pre-styled application page with:
   - Instance ID
   - Availability Zone
   - Private IP address
3. Refresh the browser multiple times to observe load balancing in action
4. The Instance ID and Private IP should alternate between two different instances

## Key Variables

All variables are defined in `variables.tf` with sensible defaults:

- `aws_region`: AWS region (default: us-east-1)
- `vpc_cidr`: VPC CIDR block (default: 10.20.0.0/16)
- `instance_type`: EC2 instance type (default: t2.micro)
- `asg_min_size`: Minimum ASG capacity (default: 2)
- `asg_max_size`: Maximum ASG capacity (default: 4)
- `asg_desired_capacity`: Desired ASG capacity (default: 2)

To override defaults, create a `terraform.tfvars` file:

```hcl
aws_region       = "us-west-2"
instance_type    = "t2.small"
asg_desired_capacity = 3
```

## Important Outputs

After deployment, key outputs are available:

- `web_app_url`: The complete URL to access the web application
- `alb_dns_name`: DNS name of the Application Load Balancer
- `asg_name`: Name of the Auto Scaling Group
- `vpc_id`: ID of the created VPC

View all outputs:

```bash
terraform output
```

## Cleanup

To destroy all AWS resources and avoid charges:

```bash
terraform destroy
```

Terraform will prompt for confirmation before removing resources.

## Security Features

1. **IMDSv2**: EC2 instances require IMDSv2 for metadata access (more secure than IMDSv1)
2. **Security Groups**: 
   - ALB accepts traffic only on port 80 from anywhere
   - EC2 instances accept traffic only on port 80 from the ALB
3. **IAM Roles**: EC2 instances use IAM roles with minimal required permissions
4. **State Encryption**: S3 backend encryption is enabled

## Troubleshooting

### Error: "Access Denied" when initializing terraform init

- Ensure your AWS credentials are properly configured
- Verify the S3 bucket exists and you have permissions

### Error: "InvalidAMIID" when applying

- The Amazon Linux 2 AMI ID may vary by region
- The data source in `main.tf` automatically fetches the latest AMI

### Application not accessible via ALB URL

- Wait 2-3 minutes for instances to pass health checks
- Check security groups allow traffic between ALB and EC2 instances
- Verify EC2 instances are running: `aws ec2 describe-instances`

### Load balancing not working

- Ensure `desired_capacity = 2` in the ASG
- Check target group health status in AWS Console
- Verify the ALB listener is configured correctly

## Best Practices Implemented

✅ Custom VPC without third-party modules  
✅ Infrastructure as Code (IaC) with Terraform  
✅ High Availability across multiple Availability Zones  
✅ Auto Scaling for dynamic capacity management  
✅ Security Groups for traffic control  
✅ IMDSv2 for secure metadata access  
✅ Remote state management with S3 and DynamoDB  
✅ IAM roles and policies for least privilege access  
✅ Tags for resource organization  
✅ Modular structure with separate configuration files  

## Additional Resources

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [AWS Auto Scaling Documentation](https://docs.aws.amazon.com/autoscaling/)
- [AWS ALB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/)

## Author

Created as part of a DevOps Diploma assignment.
