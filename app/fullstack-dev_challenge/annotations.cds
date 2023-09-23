using DevChallengeService as service from '../../srv/cat-service';

annotate service.Tests with @(
    UI.HeaderInfo             : {
        TypeName      : '{@i18n>testDetails}',
        TypeNamePlural: '{@i18n>testDetails}',
        Title         : {
            Value: 'Developer Challenge 3',
            ![@UI.Emphasized],
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: description
        }
    },
    UI.Facets                 : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'TestDetailsFacet',
            Label : '{@i18n>testDetails}',
            Target: '@UI.FieldGroup#TestDetails'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'QuestionsFacet',
            Label : '{@i18n>questions}',
            Target: 'questions/@UI.LineItem',

        }
    ],
    UI.Identification         : [{
        $Type : 'UI.DataFieldForAction',
        Label : '{@i18n>addQuestions}',
        Action: 'service.assignQuestionsToTest',

    }],
    UI.LineItem               : [
        {
            $Type: 'UI.DataField',
            Label: '{@i18n>title}',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Label: '{@i18n>descr}',
            Value: description,
        },
      
        {
            $Type: 'UI.DataField',
            Label: '{@i18n>createdBy}',
            Value: createdBy,
        },
          {
            $Type: 'UI.DataField',
            Label: '{@i18n>createdAt}',
            Value: createdAt,
            
        },
        {
            $Type: 'UI.DataField',
            Label: '{@i18n>questionsNumber}',
            Value: '4',
        }
    ],
    UI.FieldGroup #TestDetails: {
        $Type       : 'UI.FieldGroupType',
        @title      : '{@i18n>testDetails}',
        @description: '{@i18n>testDetails}',
        Data        : [
            {
                $Type: 'UI.DataField',
                Label: '{@i18n>title}',
                Value: title,
                ![@UI.Emphasized],
            },
            {
                $Type: 'UI.DataField',
                Label: '{@i18n>descr}',
                Value: description,
            },
            {
                $Type: 'UI.DataField',
                Label: '{@i18n>createdAt}',
                Value: createdAt,

            },
            {
                $Type: 'UI.DataField',
                Label: '{@i18n>createdBy}',
                Value: createdBy,
            }
        ],
    },


);

annotate service.Questions with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: text,
        Label: '{@i18n>questionText}'
    },
    {
        $Type: 'UI.DataField',
        Value: answer.text,
        Label: '{@i18n>answerText}'
    }

]);
