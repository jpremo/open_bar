import boto3

# AWS Initialization
BUCKET_NAME = os.environ.get('BUCKET_NAME')
KEY_ID = os.environ.get('AWS_KEY_ID')
SECRET_KEY_ID = os.environ.get('AWS_SECRET_KEY')
s3 = boto3.client('s3',
                  aws_access_key_id=KEY_ID,
                  aws_secret_access_key=SECRET_KEY_ID
                  )

def uploade_aws:
    
