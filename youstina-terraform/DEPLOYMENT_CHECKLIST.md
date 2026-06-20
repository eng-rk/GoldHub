# Terraform Deployment Checklist

## Pre-Deployment Checklist

- [ ] AWS account created with appropriate permissions
- [ ] Terraform installed (version 1.0+)
- [ ] AWS CLI installed and configured with credentials
- [ ] S3 bucket created for Terraform state
- [ ] DynamoDB table created for state locking (table name: recommend `terraform-locks`)
- [ ] Git repository initialized (optional but recommended)

## Configuration Steps

- [ ] Update `providers.tf` with your S3 bucket name
- [ ] Update `providers.tf` with your DynamoDB table name
- [ ] Review variables in `variables.tf` and customize if needed
- [ ] (Optional) Create `terraform.tfvars` to override variable defaults

## Deployment Steps

1. [ ] Navigate to the project directory: `cd terraform-alb-asg-assignment`
2. [ ] Initialize Terraform: `terraform init`
3. [ ] Validate configuration: `terraform validate`
4. [ ] Plan deployment: `terraform plan -out=tfplan`
5. [ ] Review plan output for accuracy
6. [ ] Apply configuration: `terraform apply tfplan`
7. [ ] Wait for all resources to be created (typically 3-5 minutes)

## Post-Deployment Verification

- [ ] Retrieve ALB DNS name: `terraform output web_app_url`
- [ ] Open the URL in a web browser
- [ ] Verify the application page loads successfully
- [ ] Verify Instance ID is displayed
- [ ] Verify Availability Zone is displayed
- [ ] Verify Private IP is displayed
- [ ] Refresh browser multiple times to verify load balancing
- [ ] Confirm Instance ID and Private IP change between refreshes
- [ ] Check AWS Console for:
  - [ ] VPC with correct CIDR block
  - [ ] Two public subnets in different AZs
  - [ ] Internet Gateway attached
  - [ ] Application Load Balancer active
  - [ ] Target Group with healthy instances
  - [ ] Auto Scaling Group with desired capacity met
  - [ ] Two running EC2 instances

## Testing Load Balancing

- [ ] Take screenshot of Instance ID from first page load
- [ ] Refresh browser
- [ ] Verify Instance ID changed to second instance
- [ ] Refresh again and verify it returned to first instance
- [ ] Document behavior for submission

## Submission Preparation

- [ ] Source code committed to Git repository
- [ ] Repository is accessible (public or shared)
- [ ] Screenshots captured of:
  - [ ] Web application page showing metadata
  - [ ] Load balanced page with different Instance ID
  - [ ] AWS Console showing ALB
  - [ ] AWS Console showing Target Group health
  - [ ] AWS Console showing ASG
  - [ ] AWS Console showing EC2 instances
- [ ] Screenshots saved in a submission folder

## Cleanup (if needed)

- [ ] Destroy resources: `terraform destroy`
- [ ] Confirm all resources are removed in AWS Console
- [ ] Verify S3 state file is deleted (optional)

## Troubleshooting

If deployment fails:
- [ ] Check CloudFormation events in AWS Console
- [ ] Review `terraform.tfstate` for error details
- [ ] Verify security group rules are correct
- [ ] Check EC2 instance user data logs: `tail -50 /var/log/cloud-init-output.log`
- [ ] Ensure targets are healthy in Target Group

## Important Notes

- The ALB may take 2-3 minutes to start routing traffic
- Health checks need to pass before instances are marked healthy
- Each EC2 instance will automatically install and configure Apache
- The web page is dynamically generated with live instance metadata
- State files contain sensitive information - never commit to Git
- Costs accumulate while resources are deployed - remember to destroy when done
