<%--
  ~ Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~
  ~ Unless you have purchased  a commercial license agreement from Jaspersoft,
  ~ the following license terms  apply:
  ~
  ~ This program is free software: you can redistribute it and/or  modify
  ~ it under the terms of the GNU Affero General Public License  as
  ~ published by the Free Software Foundation, either version 3 of  the
  ~ License, or (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  ~ GNU Affero  General Public License for more details.
  ~
  ~ You should have received a copy of the GNU Affero General Public  License
  ~ along with this program. If not, see <http://www.gnu.org/licenses/>.
  --%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>

<%@ page import="java.util.Random" %>

<%@ include file="../common/jsEdition.jsp" %>
<c:choose>
    <c:when test="${isAwsMpProduct}">
        <c:set var="jsEditionClass" value="amazon"/>
    </c:when>
    <c:when test="${isProVersion}">
        <c:set var="jsEditionClass" value="pro"/>
    </c:when>
    <c:otherwise>
        <c:set var="jsEditionClass" value="community"/>
    </c:otherwise>
</c:choose>

<%-- Rotating page count. --%>
<c:set var='rotatingPageCount' value='1'/>

<%-- Random rotating page number. --%>
<c:set var='randomRotatingPageNumber' value='<%=new Random().nextInt(Integer.parseInt(pageContext.getAttribute("rotatingPageCount").toString()))%>'/>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='jsp.Login.title'/></t:putAttribute>
    <t:putAttribute name="headerContent">
        <meta name="noMenu" content="true">
        <meta name="pageHeading" content="<spring:message code='jsp.Login.pageHeading'/>"/>

        <% response.setHeader("LoginRequested","true");
            session.removeAttribute("js_uname");
            session.removeAttribute("js_upassword");
        %>

        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/components.loginBox.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery/js/jquery.jcryption.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery/js/ext.jquery.jcryption.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/login.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/encryption.utils.js"></script>
        <script type="text/javascript">
            var isEncryptionOn = ${isEncryptionOn};
        </script>
		
		<style>

		.container {
		  padding-right: 15px;
		  padding-left: 15px;
		  margin-right: auto;
		  margin-left: auto;
		}
		@media (min-width: 768px) {
		  .container {
			width: 750px;
		  }
		}
		@media (min-width: 992px) {
		  .container {
			width: 970px;
		  }
		}
		@media (min-width: 1200px) {
		  .container {
			width: 1170px;
		  }
		}
		.container-fluid {
		  padding-right: 15px;
		  padding-left: 15px;
		  margin-right: auto;
		  margin-left: auto;
		}
		.row {
		  margin-right: -15px;
		  margin-left: -15px;
		}

		.clearfix:before,
		.clearfix:after,
		.container:before,
		.container:after,
		.container-fluid:before,
		.container-fluid:after,
		.row:before,
		.row:after,
		.form-horizontal .form-group:before,
		.form-horizontal .form-group:after,
		.btn-toolbar:before,
		.btn-toolbar:after,
		.btn-group-vertical > .btn-group:before,
		.btn-group-vertical > .btn-group:after,
		.nav:before,
		.nav:after,
		.navbar:before,
		.navbar:after,
		.navbar-header:before,
		.navbar-header:after,
		.navbar-collapse:before,
		.navbar-collapse:after,
		.pager:before,
		.pager:after,
		.panel-body:before,
		.panel-body:after,
		.modal-footer:before,
		.modal-footer:after {
		  display: table;
		  content: " ";
		}
		.clearfix:after,
		.container:after,
		.container-fluid:after,
		.row:after,
		.form-horizontal .form-group:after,
		.btn-toolbar:after,
		.btn-group-vertical > .btn-group:after,
		.nav:after,
		.navbar:after,
		.navbar-header:after,
		.navbar-collapse:after,
		.pager:after,
		.panel-body:after,
		.modal-footer:after {
		  clear: both;
		}
		.pull-right {
		  float: right !important;
		}
		.pull-left {
		  float: left !important;
		}

		html, body {
			height: 100%;
			/* The html and body elements cannot have any padding or margin. */
		  font: normal 14px Open Sans, sans-serif;
			color:#4D4D4D;
			font-size:13px;
		}
		.row {
			margin-left:0px;
			margin-right:0px;
		}
		/* Wrapper for page content to push down footer */
		#wrap {
			min-height: 100%;
			height: auto !important;
			height: 100%;
			/* Negative indent footer by its height */
		  margin: 0 auto -120px;
			/* Pad bottom by footer height */
		  padding: 0 0 120px;
		}
		h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
			font-family: Open Sans;
			font-weight:600;
		}
		/* Set the fixed height of the footer here */
		#footer {
			height: 120px;
			border-top:1px solid #ddd;
			-moz-box-shadow:0 0 20px rgba(0, 0, 0, 0.1);
			-webkit-box-shadow:0 0 20px rgba(0, 0, 0, 0.1);
			box-shadow:0 0 20px rgba(0, 0, 0, 0.1);
			background: #fffff;
			background: -moz-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(67%, #e5e5e5), color-stop(100%, #ededed));
			background: -webkit-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -o-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -ms-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: linear-gradient(to bottom, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
		 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
			text-shadow:0 1px white;
		}
		a, a img, input, textarea, .caret:after, .accordion-toggle.collapsed, .table-hover > tbody > tr > td, .close {
			-moz-transition: all 0.2s linear;
			-webkit-transition: all 0.2s linear;
			transition: all 0.2s linear;
			outline: 0;
		}
		a {
			color: #477e9b;
			text-decoration:none;
		}
		a:hover, a:active {
			border: 0;
			outline:none;
			text-decoration:none;
			color: #CA3938;
		}
		a:focus {
			outline: none;
			text-decoration:none;
		}
		*:focus {
			outline: none !important;
		}
		i {
			font-style: normal;
			font-weight: normal;
		}

		::-webkit-input-placeholder {
		 color: #999;
		font-style: italic;
		}

		:-moz-placeholder { /* Firefox 18- */
		 color: #999;
		font-style: italic;
		}

		::-moz-placeholder {  /* Firefox 19+ */
		 color: #999;
		font-style: italic;
		}

		:-ms-input-placeholder {
		 color: #999;
		font-style: italic;
		}
		 select:-moz-focusring {
		 color: transparent;
		 text-shadow: 0 0 0 #000;
		}
		ol li {
			margin-bottom: 10px;
		}
		.align-center {
			text-align: center;
		}
		input[type="radio"], input[type="checkbox"] {
			margin-top: 3px;
		}
		select.form-control, #wrap.login .container #sign-up {
			font-size: 13px
		}
		.form-control {
			padding:6px;
			font-size:13px;
		}
		.popover {
			font-size: 12px;
			color: #444;
		}
		.no-border {
			border: none !important;
		}
		.container {
			padding: 0 30px;
		}
		#wrap > .container {
			padding:10px 30px;
			margin-bottom:20px;
		}
		#nci-banner {
			background-color: #A90101;
			height: 43px;
			width: 100%;
		}
		header {
			background: #fffff;
			background: -moz-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(67%, #e5e5e5), color-stop(100%, #ededed));
			background: -webkit-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -o-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: -ms-linear-gradient(top, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
			background: linear-gradient(to bottom, #ffffff 0%, #e5e5e5 67%, #ededed 100%);
		 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
			height:87px;
			width: 100%;
		}
		header .pull-right > .dropdown-menu {
			top:65px;
			background: #fff;
			border: 1px solid #ccc;
			right: auto;
			margin:0;
		}
		header .pull-right > .dropdown-menu:before, header .pull-right > .dropdown-menu:after {
			border-style: solid;
			border-width: 0 7px 7px 7px;
			border-color: transparent transparent #ccc transparent;
			top: -7px;
			content: "";
			height: 0;
			position: absolute;
			left: 50%;
			margin-left:-7px;
			width: 0;
		}
		header .pull-right > .dropdown-menu:after {
			top: -6px;
			border-color: transparent transparent #fff transparent;
			border-width: 0 6px 6px 6px;
			margin-left:-6px;
		}
		header .pull-right > .dropdown-menu > li > a {
			padding:5px 20px 5px 30px;
			color:#3981A8;
			position:relative;
		}
		header .pull-right > .dropdown-menu > li > a:hover {
			background: #EAF5F9;
		}
		header .pull-right > .dropdown-menu .account:before, header .pull-right > .dropdown-menu .help:before {
			content:"\f013";
			font-family:'FontAwesome';
			font-size: 16px;
			color:#3981A8;
			left: 10px;
			top: 4px;
			position:absolute;
		}
		header .pull-right > .dropdown-menu .help:before {
			content:"\f059";
		}
		header .pull-right > .dropdown-menu > li.sign-out {
			text-align: center;
		}
		header .pull-right > .dropdown-menu > li.sign-out .btn-default.btn-sm {
			color:#CA3938;
			padding:5px 20px;
		}
		.dropdown-menu .divider {
			margin: 5px 0;
		}
		#nav {
			width: 100%;
			position:static;
			top:-32px;
		}
		#nav.affix {
			position: fixed;
			top: 0;
			z-index:10;
			-moz-transition: all .6s ease-in-out;
			-webkit-transition: all .6s ease-in-out;
			transition: all .6s ease-in-out;
			border-top: none;
		}
		#nci-footer {
			color: #bbb;
			line-height: 1.2em;
			font-size: 11px;
			text-align: center;
			padding:20px 0;
		}
		#nci-footer a {
			border: medium none;
			color: #333333;
			text-decoration: none;
		}
		#nci-footer a:hover {
			color:#CA3938;
		}
		#nci-footer em {
			color: #888;
		}
		.container {
			width: auto !important;
			position:relative;
		}

		.navbar-brand {
			padding: 0;
			margin-top:10px;
		}

		.form-horizontal .container a, .table td > a, .form-horizontal .control-label.left-align a, .modal-body a, .login a {
			font-weight: bold;
			border-bottom: 1px dotted #ccc;
		}
		.form-horizontal .container a:hover, .table td > a:hover, .form-horizontal .control-label.left-align a:hover, .modal-body a:hover, .login a:hover {
			border-bottom: 1px dotted transparent;
		}

		h1, h2, h3, h4 {
			color:#526D7B;
		}
		h1 {
			font-size: 26px;
		}
		h2 {
			font-size: 22px;
		}
		h3 {
			font-size: 18px;
		}

		#wrap.login .container {

			font-size:14px;
		}

		.login .navbar-brand {
			float: none;
		}
		.login .masthead {
			-webkit-box-shadow:0 4px 7px rgba(0, 0, 0, 0.2);
			box-shadow:0 4px 7px rgba(0, 0, 0, 0.2);
			border-bottom: 1px solid white;
			margin-bottom:50px;
		}

		.navbar-brand a, #nci-banner a {
			border-bottom: none !important;
		}

		hr {
			border-color: #e4e4e4;
		}
		sixty {
			width:60%;
		}
		</style>
    </t:putAttribute>
    <t:putAttribute name="bodyID" value="loginPage"/>
    <t:putAttribute name="bodyClass">oneColumn ${jsEditionClass}</t:putAttribute>
    <t:putAttribute name="bodyContent" >

        <!--[if IE 6]>
        <script type="text/javascript">
        alert("<spring:message code="LOGIN_UNSUPPORTED_BROWSER" javaScriptEscape="true"/>");
        </script>
        <![endif]-->

        <c:set var='showPasswordChange' value='<%=request.getParameter("showPasswordChange")%>'/>

        <div class="wrapper">
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="panel info"/>
                <t:putAttribute name="containerID" value="copy"/>
                <t:putAttribute name="bodyContent">
<%--
                    <div id="welcome" class="row">
                        <h1 class="textAccent02"><spring:message code='LOGIN_WELCOME_OS'/></h1>
                    </div>
                    <!--
                    <div id="buttons" class="row">
                    <div class="primary">
                    <c:choose>
                        <c:when test="${isProVersion}">
                            <button id="documentationButton" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_DOCUMENTATION'/></span><span class="icon"></span></button>
                        </c:when>
                        <c:otherwise>
                            <button id="gotoJasperForge" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_GOTO_JASPERFORGE'/></span><span class="icon"></span></button>
                        </c:otherwise>
                    </c:choose>
                    </div>
                    <div class="secondary">
                    <button id="contactSalesButton" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_CONTACT_SALES'/></span><span class="icon"></span></button>
                    </div>
                    </div>
                    -->
                    <div  id="rotating" class="row">
                        <jsp:include page="rotating/login_rotating_${jsEditionClass}_${randomRotatingPageNumber}.jsp"/>
                    </div>
--%>
     
					<div id="wrap" class="login">     
						<div id="nci-banner">
							<div class="container"> 
								<a class="pull-left" target="_blank" href="http://www.cancer.gov/"><img title="National Cancer Institute" alt="National Cancer Institute" src="${pageContext.request.contextPath}/themes/default/images/nci.jpg" border="0" height="43" width="286"></a> 
								<a class="pull-right" target="_blank" href="http://www.cancer.gov/"><img title="at the National Institutes of Health" alt="at the National Institutes of Health" src="${pageContext.request.contextPath}/themes/default/images/nih.jpg" border="0" height="43" width="322"></a> </div>
						</div>
						 <header class="masthead">
							<div class="container">
								<div class="row">
									<div class="align-center">
									  <div class="navbar-brand"><a data-placement="top" rel="tooltip" href="#" data-original-title="Clinical Trials Reporting Program"><img src="${pageContext.request.contextPath}/themes/default/images/report_back.png" ></a></div>
									</div>
							  </div>
							</div>
						  </header>				
						<div class="container">	
						  <p class="60%">The CTRP Report Server allows authorized users to view reports generated by CTRP.</p> 
						  <p class="60%">If you have any questions regarding how to obtain access to this site or how to use this site to view reports, please refer to the <a target="_blank" href="https://wiki.nci.nih.gov/display/CTRPdoc/NCI+Clinical+Trials+Reporting+Program+%28CTRP%29+User%27s+Guides">CTRP User's Guide</a> or contact the Clinical Trials Reporting Office (CTRO) at <a href=mailto:ncictro@mail.nih.gov" target="_top">ncictro@mail.nih.gov</a>.</p>
						</div>
					</div>


					<div id="footer">
						<div class="container">
							<div id="nci-footer">
							  <div class="footerLinks"> <a href="http://www.cancer.gov/global/web/policies" target="_blank">Policies</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.cancer.gov/global/web/policies/accessibility" target="_blank">Accessibility</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.cancer.gov/clinicaltrials/conducting/ncictrp/main" target="_blank">Clinical Trials Reporting Program (CTRP)</a><br>
								<br>
								<a href="http://www.dhhs.gov/" target="_blank">Department of Health and Human Services</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.nih.gov/" target="_blank">National Institutes of Health</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.cancer.gov/" target="_blank">National Cancer Institute</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.usa.gov/" target="_blank">USA.gov</a> 
							  </div>
							  <br>
							  <br>
							  <em>NIH...Turning Discovery Into Health</em> 
							</div>
						</div>
					</div>


                </t:putAttribute>
            </t:insertTemplate>

            <form id="loginForm" method="POST" action="j_spring_security_check"
                  <c:if test="${autoCompleteLoginForm == 'false'}">autocomplete="off"</c:if>>
                <t:insertTemplate template="/WEB-INF/jsp/templates/login.jsp">
                    <t:putAttribute name="jsEdition">${jsEditionClass}</t:putAttribute>
                    <t:putAttribute name="allowUserPasswordChange" value="${allowUserPasswordChange}"/>
                    <t:putAttribute name="showPasswordChange" value="${showPasswordChange}"/>
                    <t:putAttribute name="warningMessages">
                        <c:if test="${isDevelopmentEnvironmentType}">
                            <p class="warning"><b><spring:message code="LIC_023_license.envtype.development.message"/></b></p>
                        </c:if>
                        <c:if test="${isProductEditionFreeOrLimited}">
                            <c:choose>
                                <c:when test="${isReportRunsLimitReached}">
                                    <p class="warning"><b><spring:message code="LIC_025_license.freemium.runs.revoked" arguments="${reportRollingPeriodOfTime}"/></b></p>
                                    <p class="warning"><b><spring:message code="LIC_025_license.freemium.runs.revoked.login" arguments="${reportRollingPeriodOfTime}"/></b></p>
                                </c:when>
                                <c:when test="${isRunsAboveWarningThreshold}">
                                    <p class="warning"><b><spring:message code="LIC_025_license.freemium.runs.above.threshold" argumentSeparator="," arguments="${reportRollingPeriodOfTime}, ${numberOfAvailableRuns}"/></b></p>
                                    <p class="warning"><b><spring:message code="LIC_025.license.freemium.runs.above.threshold.details" arguments="${reportRollingPeriodOfTime}"/></b></p>
                                </c:when>
                                <c:otherwise>
                                    <p><b><spring:message code="LIC_025_license.freemium.runs.available" arguments="${numberOfAvailableRuns}"/></b></p>
                                    <p><b><spring:message code="LIC_025_license.freemium.upgrade.info"/></b></p>
                                </c:otherwise>
                            </c:choose>
                        </c:if>
                    </t:putAttribute>
                    <t:putAttribute name="errorMessages">
                        <c:choose>
                            <c:when test="${isProVersion}">
                                <c:choose>
                                    <c:when test="${usersExceeded && banUser}">
                                        <p class="errorMessage">
                                            <spring:message code="LIC_017_license.block.user"/>
                                        </p>
                                    </c:when>
                                    <c:when test="${usersExceeded && !banUser}">
                                        <p class="errorMessage">
                                            <spring:message code="LIC_017_license.user.count.exceeded.login.box"/>
                                        </p>
                                    </c:when>
                                </c:choose>
                            </c:when>
                        </c:choose>
                        <c:if test="${paramValues.error != null && !usersExceeded && !banUser}">
                            <c:choose>
                                <c:when test="${exception!=null}">
                                    <p class="errorMessage">${exception}</p>
                                </c:when>
                                <c:otherwise>
                                    <p class="errorMessage"><spring:message code='jsp.loginError.invalidCredentials1'/></p>
                                    <p class="errorMessage"><spring:message code='jsp.loginError.invalidCredentials2'/></p>
                                </c:otherwise>
                            </c:choose>
                        </c:if>
                        <c:if test="${showPasswordChange eq 'true'}">
                            <p class="errorMessage"><spring:message code='jsp.loginError.expiredPassword1'/></p>
                            <p class="errorMessage"><spring:message code='jsp.loginError.expiredPassword2'/></p>
                        </c:if>
                        <p id="customError" class="errorMessage hidden"></p>
                    </t:putAttribute>
                    <t:putAttribute name="localeOptions">
                        <c:forEach items="${userLocales}" var="locale">
                            <option value="${locale.code}" <c:if test="${preferredLocale == locale.code}">selected</c:if>>
                                <spring:message code="locale.option" arguments='${locale.code},${locale.description}'/>
                            </option>
                        </c:forEach>
                    </t:putAttribute>
                    <t:putAttribute name="timezoneOptions">
                        <c:forEach items="${userTimezones}" var="timezone">
                            <option value="${timezone.code}" <c:if test="${preferredTimezone == timezone.code}">selected</c:if>>
                                <spring:message code="timezone.option" arguments='${timezone.code},${timezone.description}'/>
                            </option>
                        </c:forEach>
                    </t:putAttribute>
                </t:insertTemplate>
                <c:if test="${isProVersion and isEC2}">
                    <div id="amazonLogo" class="row"></div>
                </c:if>
            </form>
        </div>

        <jsp:include page="${isProVersion and isAwsMpProduct ? 'loginHelpAws.jsp' : 'loginHelp.jsp'}" />

        <jsp:include page="loginState.jsp"/>
    </t:putAttribute>
</t:insertTemplate>
