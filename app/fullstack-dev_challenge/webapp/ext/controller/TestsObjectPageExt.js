sap.ui.define([
	"sap/m/MessageBox",
	'sap/m/MessageItem',
	'sap/m/MessagePopover',
	'sap/ui/model/json/JSONModel'
], function (MessageBox, MessageItem, MessagePopover, JSONModel) {
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

		onCloseDialog: function (oEvent) {
			this.oDialog.getContent()[0].getItems()[1].setValue();
			oEvent.getSource().getParent().close()
		},

		onAddQuestions: function (oEvent) {


			const oBindingContext = oEvent.getSource().getBindingContext();
			const oTest = oBindingContext.getValue();
			const numberOfQuestions = this.oDialog.getContent()[0].getItems()[1].getValue();
			const oModel = oBindingContext.getModel();
			this.editFlow.securedExecution(
				function () {
					const oOperation = oModel.bindContext(`/Tests(ID=${oTest.ID},IsActiveEntity=true)/DevChallengeService.assignQuestionsToTest(...)`)
					oOperation.setParameter("questionsCount", Number(numberOfQuestions))
					oOperation.execute().then(async function () {
						const oResults = oOperation.getBoundContext().getObject()
						if (oResults && oResults.value[0] && oResults.value) {
							MessageBox.information(oResults.value);

						}
						await oBindingContext.refresh();

					}.bind(this), function (oError) {
						MessageBox.error(oError.message);
					})

					this.oDialog.getContent()[0].getItems()[1].setValue();
					oEvent.getSource().getParent().close();
				}.bind(this)
			);

		},

		onMessagePopoverPress: function (oContext, oSelectedContext) {
			if (!this.oMessagePopover) {
				var oMessageTemplate = new MessageItem({
					type: '{type}',
					title: '{title}',
					activeTitle: "{active}",
					description: '{description}',
					subtitle: '{subtitle}',
					counter: '{counter}',
					markupDescription: true
				});
				var aMockMessages = [{
					type: 'Error',
					title: 'Error message',
					active: true,
					description: 'sErrorDescription',
					subtitle: 'Example of subtitle',
					counter: 1
				}];
				this.oMessagePopover = new MessagePopover({
					items: {
						path: '/',
						template: oMessageTemplate
					},
					activeTitlePress: function () {
						MessageToast.show('Active title is pressed');
					}
				});
				// oEvent.getSource().addDependent(oMessagePopover);
			}
		},

	};
});
