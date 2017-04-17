<%--
  ~ Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~ Licensed under commercial Jaspersoft Subscription License Agreement
  --%>
<%@ page import="com.jaspersoft.jasperserver.api.metadata.user.domain.impl.client.MetadataUserDetails" %>
<%@ page import="com.jaspersoft.ji.license.LicenseManager" %>
<%@ page import="org.springframework.security.context.SecurityContextHolder" %>
<%@ page import="com.jaspersoft.jasperserver.api.common.util.spring.StaticApplicationContext" %>
<%@ page import="com.jaspersoft.ji.license.LicenseReportCounter" %>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib uri="/spring" prefix="spring"%>

<%
    request.setAttribute("homePage","true");
    String resourcePrefixForRootUser = "/organizations/organization_1";

    boolean isRootUser = false;
    LicenseReportCounter licenseReportCounter = StaticApplicationContext.getApplicationContext().getBean("licenseReportCounter", LicenseReportCounter.class);
    // in case demo user was created in root we need to prefix the /supermart/SupermartDashboard30 resource see bug 31217
    // type check
    if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof MetadataUserDetails){

        // checking if the user belongs to root organization
        // if the tenant is null or "" - They are different in the user detail and in the principal
        if (((MetadataUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTenantId()==null ||
                ((MetadataUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getTenantId().isEmpty()){

            isRootUser = true;
        }
    }
%>

<%if (licenseReportCounter != null && licenseReportCounter.isReportRunsLimitReached()) {%>
    <script>
        window.location="${pageContext.request.contextPath}/flow.html?_flowId=dashboardRuntimeFlow&dashboardResource=<%=isRootUser? resourcePrefixForRootUser : "" %>/supermart/SupermartDashboard30&hidden_isJasperAnalysis=<%=LicenseManager.isAnalysisFeatureSupported()?"true":"false"%>";
    </script>
<% } else {%>
    <t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
        <t:putAttribute name="pageTitle"><spring:message code='home.title'/></t:putAttribute>
        <t:putAttribute name="bodyID">home_user</t:putAttribute>
        <t:putAttribute name="bodyClass" value="oneColumn"/>
        <t:putAttribute name="bodyContent" >
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="column decorated primary"/>
                <t:putAttribute name="containerTitle"><spring:message code="home.header.title"/></t:putAttribute>
                <t:putAttribute name="swipeScroll" value="${isIPad}"/>
                <t:putAttribute name="bodyContent">
                    <iframe id="outerFrame" class="outerDashboardFrame" name="Dashboard" allowtransparency="true" align="center" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" height="450" width="100%" scrolling="no"
                            src="${pageContext.request.contextPath}/flow.html?_flowId=dashboardRuntimeFlow&amp;dashboardResource=<%=isRootUser? resourcePrefixForRootUser : "" %>/supermart/SupermartDashboard30&viewAsDashboardFrame=true&decorate=no&hidden_isJasperAnalysis=<%=LicenseManager.isAnalysisFeatureSupported()?"true":"false"%>">
                    </iframe>
                </t:putAttribute>
            </t:insertTemplate>
        </t:putAttribute>
    </t:insertTemplate>
<%}%>
