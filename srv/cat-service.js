const cds = require('@sap/cds') 

module.exports = class DevChallengeService extends cds.ApplicationService { 
   
    init() { 
        return super.init() 
    } 
    
    // TODO: Implement the bound action: assignQuestionsToTest  
    async assignQuestionsToTest(Tests,id,questionsCount ){
        // db = await cds.connect.to('db');
        if(questionsCount<1){
            return 'a test must have at least 1 question';
        }
        const questions =  await cds.run(SELECT.from(`DevChallengeService.Questions`).where({ test:null }).limit (questionsCount));
        let msg = '';
        if(!questions || questions.length === 0){
            return 'No questions available for assignment'
        } else if ( questions.length < questionsCount ) {
            
            msg =  'There are only ' + questions.length +  'question(s) available.' ;
        }
        questions.forEach(question => {
            const test =  cds.run(
                UPDATE (`DevChallengeService.Questions`,question.ID)
                    .with({test:id})
            );
        });
       
        msg += `${questions.length} questioons successfully added to the test`;
        return msg;
    }

} 