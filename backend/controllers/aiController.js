const Summary=require('../models/Summary');
const getSummaries=async(req,res)=>{
    try{
        const summaries=await Summary.find();
        res.status(200).json(summaries);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const createSummary=async(req, res)=>{
    const {text}=req.body;
    try{
        const summaryText=`Summary of: ${text.substring(0,100)}...`;
        const newSummary=await Summary.create({
            originalText:text,
            summarizedText:summaryText
        });
        res.status(200).json(newSummary);
    }catch(error){
        res.status(500).json({message:error.message});

    }
};
const deleteSummary=async(req,res)=>{
    try{
        await Summary.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'summary deleted'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports={getSummaries,createSummary,deleteSummary};
//aiController.js