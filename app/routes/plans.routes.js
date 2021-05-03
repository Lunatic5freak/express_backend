module.exports=(app)=>{
    const router=require('express').Router()
    const plan=require('./../controllers/plan.controller');

    router.post('/',plan.create);
    router.put('/:id',plan.update);
    router.delete('/:id',plan.delete);
    router.get('/',plan.findall);

    app.use('/api/plans',router);
}