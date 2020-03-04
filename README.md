### css templete
* https://fezvrasta.github.io/bootstrap-material-design/

### firebase 
* firebase init
* firebase deploy


### gcloud 
* gcloud auth login
* gcloud services enable run.googleapis.com (เช็คสถานะ)
* gcloud container images list
* gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/fullstack-challenge

### download proxy สำหรับ sql
* curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
* chmod +x cloud_sql_proxy

### set proxy สำหรับ sql


### sql
* การเชื่อมต่อต้อง connect กับ ไอพีตัวเอง (http://ipv4.whatismyv6.com/)

* export GOOGLE_APPLICATION_CREDENTIALS=./fullstack-challenge-479c4-897c0af18d89.json
* export CLOUD_SQL_CONNECTION_NAME='fullstack-challenge-479c4:us-central1:fullstackchallege'


* ./cloud_sql_proxy -dir=/cloudsql --instances=$CLOUD_SQL_CONNECTION_NAME --credential_file=$GOOGLE_APPLICATION_CREDENTIALS

* ./cloud_sql_proxy -dir=/cloudsql --instances=fullstack-challenge-479c4:us-central1:fullstackchallege --credential_file=./fullstack-challenge-479c4-897c0af18d89.json


### docker command
* docker build -t nickmenza/fullstack .
* docker run -p 49160:3000 -d nickmenza/fullstack