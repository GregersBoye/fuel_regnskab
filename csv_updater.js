const apiUrl = 'https://sample-videos.com/csv/Sample-Spreadsheet-100-rows.csv';

function putObjectToS3(bucket, key, data){
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        Key: key,
        Body: data
    }
    s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    });
}
