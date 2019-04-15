const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const events = []

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`

        input  EventInput{
            title:String!
        description:String!
        status:String!
        startdate:String! 
        enddate:String!

        }

        type Event {
        _id:ID!
        title:String!
        description:String!
        status:String!
        startdate:String! 
        enddate:String! 
}

    type RootQuery{
        events:[Event!]!

    }
    type RootMutation{
        createEvents(eventInput:EventInput):Event

    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
    
    `),
    rootValue: {
        events: () => {

            return events;
        },
        createEvents: (args) => {
            console.log("aaa");
            const event = {
                _id: 1,
                title: args.eventInput.title,
                description: args.eventInput.description,
                status: args.eventInput.status,
                startdate: new Date().toISOString(),
                enddate: args.eventInput.enddate

            }
            events.push(event);
            
            return event;
        }
    },
    graphiql: true
}));

app.listen(3000);