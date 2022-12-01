
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const db_url='mongodb://localhost:27017/dummy'

app.use(express.json())

mongoose.connect(db_url,()=>console.log('connected to database'))

const personSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true}
})

const Person=mongoose.model('people',personSchema,'people')

app.get('/',(request,response)=>response.send('Hello world'))
app.get('/musty',(request,response)=>response.send('hello Musty'))
app.get('/getPeople',async(request,response)=>{
    try{
        const people= await Person.find()
        response.send(people.map(x=>x.name))
    }catch(error){
        response.sendStatus(500)
        console.log(error)
    }
})
app.post('/postPerson',async(request,response)=>{
    try{
        const person=request.body
        const newPerson=await Person.create(person)
        response.send(newPerson)
    }catch(error){
        response.sendStatus(500)
        console.log(error)
    }
})

app.listen(3001,()=>{
    console.log('Hello, i am a server')
})