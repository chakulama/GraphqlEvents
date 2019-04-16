const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Event = require('./models/event');

const graphqlHttp = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const events = [];

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

          return  Event.find().then(
                events=>{
                    return events.map(events=>{
                        console.log(events)
                        return {...events._doc};
                    })
                }
            ).catch(err=>{
                console.log(err);
                throw err;
            });
        },
        createEvents: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                status: args.eventInput.status,
                startdate: new Date().toISOString(),
                enddate: args.eventInput.enddate
            })
            return event
            .save().then(result=>{
                console.log(event)
                return {...result._doc};
            }).catch(err=>{
                console.log(err);
                throw err;
            });
           
        }
    },
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-u8njf.mongodb.net/test?retryWrites=true`).then(()=>{
        app.listen(3000);
}).catch(err=>{
    console.log(err)
});
