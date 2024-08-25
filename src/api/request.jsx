export default async function requestMongo(collection, body, action) {
    const token = await requestTokenMongo();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    let raw = "";

    if(body != ""){
        raw = JSON.stringify({
          "collection": `${collection}`,
          "database": "quan2qual",
          "dataSource": "Quan2Qual",
          ...body
        });
        console.log('Raw: ', raw);
    } else{
        raw = JSON.stringify({
            "collection": `${collection}`,
            "database": "quan2qual",
            "dataSource": "Quan2Qual",
        });
    }
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const result = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/data-sojtsfv/endpoint/data/v1/action/${action}`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error(error));
    return result;  
};

async function requestTokenMongo(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": "est.sebastian.lamp@unimilitar.edu.co",
    "password": "Sebasmongo2400/-"
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };
    
    const token = await fetch("https://us-east-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-sojtsfv/auth/providers/local-userpass/login", requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
    return token.access_token; 
}