# This file is for reference only.
# The backend configuration is already defined in providers.tf
# 
# To enable remote state storage in S3, update the backend block in providers.tf with:
# 1. YOUR_S3_BUCKET_NAME - Replace with your S3 bucket name
# 2. YOUR_DYNAMODB_TABLE - Replace with your DynamoDB table name
#
# Example:
# backend "s3" {
#   bucket         = "my-terraform-state-bucket"
#   key            = "assignment/alb-asg/terraform.tfstate"
#   region         = "us-east-1"
#   encrypt        = true
#   dynamodb_table = "terraform-locks"
# }
