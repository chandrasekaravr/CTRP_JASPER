<%--
  ~ Copyright (C) 2005 - 2009 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~ Licensed under commercial Jaspersoft Subscription License Agreement
  --%>
<script type="text/javascript">
    Report.allRequestParameters = ${allRequestParameters};
</script>

<c:if test="${needPageRefresh}">
    <script type="text/javascript">
        <%-- HTTP redirect can't be applied here because it adds jsessionid parameter --%>
        window.location.reload();
    </script>
</c:if>
