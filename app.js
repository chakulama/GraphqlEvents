const express=  require('express');
const bodyParser= require ('body-parser');

const graphqlHttp = require ('express-graphql');
const  { buildSchema } = require ('graphql');

const app= express ();

app.use(bodyParser.json());

app.use('/graphql',graphqlHttp(
    {
    schema:buildSchema(`
    type RootQuery{
        events:[String!]

    }
    type RootMutation{
        createEvents(name:String):String

    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
    
    `),
    rootValue: {
        events:()=>{
            
            return ['Upadate frontend','Make new graphql api'];
        } ,
        createEvents:(args)=>{
            console.log("aaa");
            const evenName= args.name;
            
            return evenName;

        }
       },
       graphiql:true
        }));

app.listen(3000);