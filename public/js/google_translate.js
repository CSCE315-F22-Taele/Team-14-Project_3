// const express = require('express');

// const {Translate} = require('@google-cloud/translate').v2;
// require('dotenv').config();

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// const translate =new Translate({
//     credentials:CREDENTIALS,
//     projectId: CREDENTIALS.projectId
// });
// const testTrans = async(text, language)=>{
//     if(language != undefined && language !='en'){
//         return translateText(text,language);
//     }
//     return text;
// };
// const translateText = async(text,targetLanguage)=>{
//     try{
//         let [response] = await translate.translate(text, targetLanguage);
//         return response;
//     }catch(error){
//         console.log('Error translating text: ${error}');
//         return 0;
//     }
// };

// translateText('Hello World!','es-MX')
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });