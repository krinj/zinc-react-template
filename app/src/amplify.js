import {Auth} from "aws-amplify";


const awsmobile = {
    "aws_project_region": "us-east-1",
    // "aws_content_delivery_bucket": "amptest-20200404171515-hostingbucket-ampenv",
    // "aws_content_delivery_bucket_region": "ap-southeast-2",
    // "aws_content_delivery_url": "http://amptest-20200404171515-hostingbucket-ampenv.s3-website-ap-southeast-2.amazonaws.com",
    // "aws_cognito_identity_pool_id": "ap-southeast-2:8c04a5bf-dbd6-4d0d-a9f9-bb1aaaf2581a",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_lI5CucUoQ",
    "aws_user_pools_web_client_id": "5gvme1pp94g4f6ugp5mmc2p240",
    "aws_cognito_identity_pool_id": "us-east-1:4006f429-e595-410b-8b82-ae24be939171",
    // "oauth": {},
    // "aws_dynamodb_all_tables_region": "ap-southeast-2",
    // "aws_dynamodb_table_schemas": [
    //     {
    //         "tableName": "dynamobb38af6f-ampenv",
    //         "region": "ap-southeast-2"
    //     }
    // ],
    "aws_cloud_logic_custom": [
        {
            "name": "apiCrudGet",
            "endpoint": "https://apix.pixiweb.net/item",
            "region": "us-east-1"
        },
        {
            "name": "apiCrudPost",
            "endpoint": "https://apix.pixiweb.net/item",
            "region": "us-east-1",
            // custom_header: { Authorization: "xxxxxx"}
            custom_header: async () => { 
                // return { Authorization : 'token' } 
                // Alternatively, with Cognito User Pools use this:
                return { Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
              }
        }
    ]
};


export default awsmobile;
