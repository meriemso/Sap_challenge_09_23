sap.ui.define([
	"sap/m/MessageBox",
	'sap/m/MessageItem',
	'sap/m/MessagePopover',
	'sap/ui/model/json/JSONModel'
], function ( MessageBox, MessageItem,MessagePopover,JSONModel) {
	'use strict';

	return {
		addQuestionsPress: function (oEvent) {
			// this.onOpenDialog();
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "fullstackdevchallenge.ext.fragment.addQuestions"
				});
			
			}
			this.pDialog.then(function (oDialog) {
				this.oDialog = oDialog;
				oDialog.open();
			}.bind(this));
			
		},

		onCloseDialog : function (oEvent) {
			this.oDialog.getContent()[0].mAggregations.items[1]._se()
			oEvent.getSource().getParent().close()
		},

		onAddQuestions: function (oEvent) {
			
			const oBindingContext = oEvent.getSource().getBindingContext();
			const  oTest = oBindingContext.getValue();
            const numberOfQuestions = this.oDialog.getContent()[0].mAggregations.items[1]._getInputValue()
			const oModel = oBindingContext.getModel();
			const oOperation = oModel.bindContext(`/Tests(ID=${oTest.ID},IsActiveEntity=true)/DevChallengeService.assignQuestionsToTest(...)`)
            oOperation.setParameter("questionsCount", Number(numberOfQuestions))
            oOperation.execute().then(async function () {
                const oResults = oOperation.getBoundContext().getObject()
                if (oResults && oResults.value[0] && oResults.value) {
                    MessageBox.information(oResults.value) 
                }
                await oBindingContext.refresh()

            }.bind(this), function (oError) {
                MessageBox.error(oError.message)
            })
			
			oEvent.getSource().getParent().close()

		},

		
	};
});
