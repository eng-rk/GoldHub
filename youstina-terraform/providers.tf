terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend configuration: Uncomment and update with your S3 bucket and DynamoDB table
  # backend "s3" {
  #   bucket         = "your-actual-s3-bucket"
  #   key            = "assignment/alb-asg/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "your-actual-dynamodb-table"
  # }

  # Using local backend for testing - comment out the S3 backend and uncomment above when ready
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ALB-ASG-Assignment"
      ManagedBy   = "Terraform"
    }
  }
}
