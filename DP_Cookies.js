/*  DepressedPress.com, DP_Cookies

Author: Jim Davis, the Depressed Press of Boston
Created: June 28, 2006
Contact: webmaster@depressedpress.com
Website: www.depressedpress.com

Full documentation can be found at:
http://depressedpress.com/javascript-extensions/

DP_Cookies abstracts client-side cookie processing and management into a simplified, object-oriented interface.


+ + + + + + + + LEGAL NOTICE + + + + + + + +

Copyright (c) 1996-2014, The Depressed Press (depressedpress.com)

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

+) Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

+) Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

+) Neither the name of the DEPRESSED PRESS (DEPRESSEDPRESS.COM) nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

DP_Cookies = new Object();

DP_Cookies.enabled = function() {

	return navigator.cookieEnabled

};

DP_Cookies.set = function(Name, Value, Timespan, TimespanUnit, Domain, Path, Secure) {

		// Set the Name
	Name = Name.replace(/^\s*|\s*$/g,"");
		// Set the Value
	if ( Value ) { Value = escape(Value) } else { Value="" };
		// Set the Expires Value
	if ( typeof Timespan == "number" ) {
		var CurDate = new Date();
		switch (TimespanUnit) {
			case "days":
				Timespan = Timespan * 24 * 60 * 60 * 1000;
				break;
			case "hours":
				Timespan = Timespan * 60 * 60 * 1000;
				break;
			case "minutes":
				Timespan = Timespan * 60 * 1000;
				break;
			case "seconds":
				Timespan = Timespan * 1000;
				break;
			default:
				Timespan = Timespan * 24 * 60 * 60 * 1000;
				break;
		};
		CurDate.setTime(CurDate.getTime() + Timespan);
		var Expires = "; expires=" + CurDate.toGMTString();
	} else {
		var Expires = "";
	};
		// Set the Path value
	if ( Path ) { Path = "; path=" + Path } else { Path = "" };
		// Set the Domain value
	if ( Domain ) { Domain = "; domain=" + Domain } else { Domain = "" };
		// Set the Secure value
	if ( Secure ) { Secure = "; secure" } else { Secure = "" };

	var CookieValue = Name + "=" + Value + Expires + Path + Domain + Secure;

		// Write the Cookie
	document.cookie = CookieValue;

		// Return the cookie
	return CookieValue;

};

DP_Cookies.erase = function(Name) {

		// Delete the cookie by calling "set" with a negative expiry value
	this.set(Name.replace(/^\s*|\s*$/g,""), "", -1);

		// Return "true"
	return true;

};

DP_Cookies.eraseAll = function() {

	var Cookies = document.cookie.split(";");

	for ( var Cnt=0; Cnt < Cookies.length; Cnt++ ) {
		var CurCookie = Cookies[Cnt].split("=");
		if ( CurCookie[0] ) {
			this.set(CurCookie[0].replace(/^\s*|\s*$/g,""), "", -1);
		};
	};

		// Return "true"
	return true;

};

DP_Cookies.get = function(Name) {

		// Set the Name
	Name = Name.replace(/^\s*|\s*$/g,"");

	var Cookies = document.cookie.split(";");

	for ( var Cnt=0; Cnt < Cookies.length; Cnt++ ) {
		var CurCookie = Cookies[Cnt].split("=");
		if ( CurCookie[0].replace(/^\s*|\s*$/g,"") == Name ) {
			if ( CurCookie[1] ) {
				return CurCookie[1];
			} else {
				return "";
			};
		};
	};

	return null;

};

DP_Cookies.getAll = function() {

	var AllCookies = new Object;
	var Cookies = document.cookie.split(";");

	for ( var Cnt=0; Cnt < Cookies.length; Cnt++ ) {
		var CurCookie = Cookies[Cnt].split("=");
		if ( CurCookie[0] ) {
			if ( CurCookie[1] ) {
				AllCookies[CurCookie[0].replace(/^\s*|\s*$/g,"")] = CurCookie[1];
			} else {
				AllCookies[CurCookie[0].replace(/^\s*|\s*$/g,"")] = "";
			};
		};
	};

	return AllCookies;

};