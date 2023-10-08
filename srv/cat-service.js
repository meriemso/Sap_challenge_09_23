const cds = require('@sap/cds')

module.exports = class DevChallengeService extends cds.ApplicationService {

    init() {
        this.after('READ', 'Tests', aTests => {
             aTests.forEach(async test => {
                const  questions = await cds.run(
                    SELECT.from(`DevChallengeService.Questions`).where({ test_ID: test.ID })
                )
                if (questions.length ) {
                    test.numberOfQuestions = questions.length
                } else {
                    test.numberOfQuestions = 0
                }
                test.critical = ( test.numberOfQuestions > 0 ? 3 : 1 );
            })
        });
        return super.init()
    }

    // TODO: Implement the bound action: assignQuestionsToTest  
    async assignQuestionsToTest(Tests, id, questionsCount) {

        if (questionsCount < 1) {
            return 'a test must have at least 1 question';
        }
        const questions = await cds.run(SELECT.from(`DevChallengeService.Questions`).where({ test: null }).limit(questionsCount));
        let msg = '';
        if (!questions || questions.length === 0) {
            return 'No questions available for assignment. '
        } else if (questions.length < questionsCount) {

            msg = 'There are only ' + questions.length + 'question(s) available. ';
        }
        questions.forEach(question => {
            const test = cds.run(
                UPDATE(`DevChallengeService.Questions`, question.ID)
                    .with({ test: id })
            );
        });

        msg += `${questions.length} question(s) successfully added to the test`;
        return msg;
    }

} 