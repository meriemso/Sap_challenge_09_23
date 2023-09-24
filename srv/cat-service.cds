using fullstack_dev_challenge from '../db/data-model';  

service DevChallengeService @(path: '/dev-challenge') {  
    @odata.draft.enabled: true 
    entity Tests as select from fullstack_dev_challenge.Tests {
        *,
        null as numberOfQuestions: Integer,
        null as critical: Integer
    }
        actions {
            action assignQuestionsToTest(questionsCount:Integer) returns String;
        };  

    // TODO: Expose other entities here  
    entity Questions as projection on fullstack_dev_challenge.Questions;

}