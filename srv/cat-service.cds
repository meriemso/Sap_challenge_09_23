using fullstack_dev_challenge from '../db/data-model';  

service DevChallengeService @(path: '/dev-challenge') {  
    @odata.draft.enabled: true 
    entity Tests as projection on fullstack_dev_challenge.Tests 

        actions {
            action assignQuestionsToTest(questionsCount:Integer) returns String;
        };  

    // TODO: Expose other entities here  
    entity Questions as projection on fullstack_dev_challenge.Questions;

}