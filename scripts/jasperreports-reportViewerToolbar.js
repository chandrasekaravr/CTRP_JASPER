/**
 * Defines 'viewertoolbar' module  in jasperreports namespace
 */
(function(global) {
	if (typeof global.jasperreports.reportviewertoolbar !== 'undefined') {
		return;
	}
	
	var jvt = {
				stateStack: {
					counter: 0,
					states: new Array(),
					position: -1
				},
				PARAM_ACTION: 'jr.action',
				events: {
					DEFAULT_ACTION: 'jasperreports.reportviewertoolbar.default.action',
					UNDO: 'jasperreports.reportviewertoolbar.undo',
					UNDO_ALL: 'jasperreports.reportviewertoolbar.undo.all',
					REDO: 'jasperreports.reportviewertoolbar.redo'
				}
	};
	
	jvt.stateStack.newState = function() {
		if (this.position + 2 < this.states.length) {
			this.states.splice(this.position + 2, this.states.length - this.position - 2);
		}
		
		++this.position;
		++this.counter;
		this.states[this.position] = this.counter;
	}
	
	jvt.stateStack.prevState = function() {
		if (this.position > 0) {
			--this.position;
		}
	}
	
	jvt.stateStack.firstState = function() {
		this.position = 0;
	}
	
	jvt.stateStack.nextState = function() {
		if (this.position + 1 < this.states.length) {
			++this.position;
		}
	}
	
	jvt.stateStack.hasPrevious = function() {
		return this.position > 0;
	}
	
	jvt.stateStack.hasNext = function() {
		return this.position + 1 < this.states.length;
	}
	
	jvt.stateStack.currentState = function() {
		return this.states[this.position];
	}
	
	jvt.currentState = function() {
		return jvt.stateStack.currentState();
	}
	
	jvt.performAction = function () {
		jvt.stateStack.newState();
		
		buttonManager.enable($('undo'));
		buttonManager.enable($('undoAll'));

		buttonManager.disable($('redo'));
	};
	
	jvt.performUndo = function () {
		jvt.stateStack.prevState();
		
		buttonManager.enable($('redo'));
		
		if (!jvt.stateStack.hasPrevious()) {
			buttonManager.disable($('undo'));
			buttonManager.disable($('undoAll'));
		}
	};

	jvt.performUndoAll = function () {
		jvt.stateStack.firstState();
		
		buttonManager.enable($('redo'));
		
		buttonManager.disable($('undo'));
		buttonManager.disable($('undoAll'));
	};
	
	jvt.performRedo = function () {
		jvt.stateStack.nextState();
		
		buttonManager.enable($('undo'));
		buttonManager.enable($('undoAll'));
		
		if (!jvt.stateStack.hasNext()) {
			buttonManager.disable($('redo'));
		}
	};

	jvt.runReport = function(options) {
		var settings = {
				selectedColumn: null,
				actionData: null,
				callback: null,
				arrCallbackArgs: null,
				thisContext: null,
				defaultAction: false
			},		
			gm = global.jasperreports.global;
		
		jQuery.extend(settings, options);
		
		if (typeof settings.actionData === 'object') {
			settings.actionData = gm.toJsonString(settings.actionData, true);
		}
		
		settings.selectedColumn.actionBaseData[jvt.PARAM_ACTION] = settings.actionData;
		
		var reportOptions = {
				callback: function() {
					Report.reportRefreshed();
					
					if (settings.defaultAction) {
						jasperreports.events.subscribeToEvent({name: jvt.events.DEFAULT_ACTION, callback: jvt.performAction});
						
						settings.callback = 'jasperreports.events.registerTriggerReset';
						settings.arrCallbackArgs = [jvt.events.DEFAULT_ACTION];
						settings.thisContext = 'jasperreports.events';
					}
					
					if (settings.callback) {
						gm.extractCallbackFunction(settings.callback).apply(gm.extractCallbackFunction(settings.thisContext), settings.arrCallbackArgs);
					}
				}
		};
		
		Report.rerunReport(null, reportOptions, settings.selectedColumn.actionBaseData);
	};
	
	jvt.undo = function() {
		jasperreports.events.subscribeToEvent({name: jvt.events.UNDO, callback: jvt.performUndo});
		jive.runAction({
			actionData: {actionName: "undo"},
			callback: 'jasperreports.events.registerTriggerReset',
			arrCallbackArgs: [jvt.events.UNDO],
			thisContext: 'jasperreports.events'
		});
	};
	
	jvt.redo = function() {
		jasperreports.events.subscribeToEvent({name: jvt.events.REDO, callback: jvt.performRedo});
		jive.runAction({
				actionData: {actionName: "redo"},
				callback: 'jasperreports.events.registerTriggerReset',
				arrCallbackArgs: [jvt.events.REDO],
				thisContext: 'jasperreports.events'
		});
	};
	
	jvt.undoAll = function() {
		jasperreports.events.subscribeToEvent({name: jvt.events.UNDO_ALL, callback: jvt.performUndoAll});
		jive.runAction({
			actionData: {actionName: "undoAll"},
			callback: 'jasperreports.events.registerTriggerReset',
			arrCallbackArgs: [jvt.events.UNDO_ALL],
			thisContext: 'jasperreports.events'
		});
	};
	
	// add an initial state
	jvt.stateStack.newState();

	global.jasperreports.reportviewertoolbar = jvt;
	
} (this));
