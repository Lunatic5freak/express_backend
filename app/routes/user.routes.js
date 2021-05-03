module.exports=(app)=>{
    const router=require('express').Router();
    const user=require('./../controllers/user.controller')

    router.post('/',user.create);
    router.get('/:id',user.findone);
    router.put('/:id',user.update);
    router.delete('/:id',user.delete);
    router.get('/',user.findall);

    app.use('api/user',router);
}