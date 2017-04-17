<%--
  ~ Copyright (C) 2005 - 2013 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~ Licensed under commercial Jaspersoft Subscription License Agreement
--%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<style type="text/css">
    h2, h3 	{
        margin:6px 0px 0px 14px;
    }

    p.intro			{margin-left:12px;}
    p.preList		{margin-bottom:6px}
    p:last-child	{margin-bottom:0;}

    .instructions {
        width:100%;
        margin:24px 0;
        border-top: 1px solid #f1f1f1;
    }

    .instructions th {
        text-align: left;
        padding:8px 8px 8px 16px;
        border-bottom: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
    }

    .instructions td 			{padding:8px 8px 8px 0; border-bottom:1px solid  #f1f1f1;}
    .instructions ul			{margin-top: 0; list-style-type: none;}
    .instructions ul li 		{margin-bottom: 6px;}
    .instructions ul li ul 		{margin-left: 20px;}
    .instructions ul li ul li	{margin: auto;}

    .details 		{border:none;}

    .details td,
    .details th 	{border:none; padding-left:8px;}

    .details th 		{text-align:right; color:#7d7d7d;}
    .details th span 	{background-color:#eeefef; padding:4px; width:100%; display: inline-block}
    .code 				{font-family: monospace; color:green;}
</style>

<script type="text/javascript"><![CDATA[
function externalLinks() {
    if (!document.getElementsByTagName) return;
    var anchors = document.getElementsByTagName("a");
    for (var i=0; i<anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.getAttribute("href") &&
                anchor.getAttribute("rel") == "external") {
            anchor.target = "_blank";
        }
    }
}
window.onload = externalLinks;
//]]></script>


<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle">JasperReports Server Instance Configuration</t:putAttribute>
    <t:putAttribute name="bodyID" value="awsConfiguration"/>
    <t:putAttribute name="bodyClass" value="oneColumn"/>

    <t:putAttribute name="bodyContent" >
        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerClass" value="column decorated primary"/>
            <t:putAttribute name="containerTitle">Configuration Information</t:putAttribute>
            <t:putAttribute name="bodyClass" value="flow"/>
            <t:putAttribute name="bodyContent">
                <h2>JasperReports Server Configuration for AWS</h2>
                <h3>Amazon Machine Image provided by Jaspersoft</h3>

                <table class="instructions">
                    <tr>
                        <th>Logins</th>
                        <td>
                            <table class="details">
                                <tr>
                                    <th><span>JasperReports Server:</span></th>
                                    <td>
                                        <p>superuser/superuser (must be changed on first login)</p>
                                        <p>other default users are initially disabled, passwords require change on first login</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>Operating system:</span></th>
                                    <td>
                                        <p>Amazon Linux AMI release 2013.03<!-- can be checked as follows: more /etc/system-release --></p>
                                        <p>Use login "ec2-user" to login. You must have the appropriate private key in order to SSH to the machine.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>JasperReports Server</th>
                        <td>
                            <table class="details">
                                <tr>
                                    <th><span>repository database technology:</span></th>
                                    <td>PostgreSQL</td>
                                </tr>
                                <tr>
                                    <th><span>repository database name:</span></th>
                                    <td>jasperserver</td>
                                </tr>
                                <tr>
                                    <th><span>deployed location:</span></th>
                                    <td>
                                        <span class="code">/var/lib/tomcat7/webapps/jasperserver-pro/</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>logs:</span></th>
                                    <td>
                                        <span class="code">/var/log/jasperserver/</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>volumes:</span></th>
                                    <td>
                                        <span class="code">8GB EBS, 1 ephemeral storage</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>import/export utility:</span></th>
                                    <td>
                                        <p class="code">/usr/share/jrs_dist/jasperreports-server-5.2-bin/buildomatic/js-import.sh</p>
                                        <p class="code">/usr/share/jrs_dist/jasperreports-server-5.2-bin/buildomatic/js-export.sh</p>
                                        <p style="margin-top:16px;">examples:</p>
                                        <p class="code">[ec2-user@ip-10-0-0-1 ~]# cd /usr/share/jrs_dist/jasperreports-server-5.2-bin/buildomatic/</p>
                                        <p class="code">[ec2-user@ip-10-0-0-1 buildomatic]# sudo ./js-export.sh --help</p>
                                        <p class="code">[ec2-user@ip-10-0-0-1 buildomatic]# sudo ./js-export.sh --uris /organizations/organization_1/reports --output-zip /tmp/my_reports.zip</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <th>Apache Tomcat</th>
                        <td>
                            <p class="intro">JasperReports Server is deployed to the application server <a href="http://tomcat.apache.org/">Apache Tomcat</a> 7.</p>
                            <p class="intro">Tomcat listens on port 80.</p>
                            <table class="details">
                                <tr>
                                    <th><span>configuration settings:</th>
                                    <td>
                                        <p class="code">/etc/sysconfig/tomcat7</p>
                                        <p class="code">/etc/tomcat7/tomcat7.conf</p>
                                        <p class="code">/etc/tomcat7/server.xml</p>
                                        <p>tomcat7.conf is the main configuration file. Other property files in the same directory include catalina.properties, web.xml, workers.properties.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>lib:</span></th>
                                    <td><span class="code">/usr/share/java/tomcat7/</span></td>
                                </tr>
                                <tr>
                                    <th><span>webapps:</span></th>
                                    <td><span class="code">/var/lib/tomcat7/webapps/</span></td>
                                </tr>
                                <tr>
                                    <th><span>log files:</span></th>
                                    <td><span class="code">/var/log/tomcat7/</span></td>
                                </tr>
                                <tr>
                                    <th><span>memory settings:</span></th>
                                    <td><span class="code">By default memory settings are dynamic and based on EC2 instance type, for more info look at tomcat7.conf file</span></td>
                                </tr>
                                <tr>
                                    <th><span>start &amp; stop command line:</span></th>
                                    <td>
                                        <p class="code">service tomcat7 stop</p>
                                        <p class="code">service tomcat7 start</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>start &amp; stop configuration:</span></th>
                                    <td><p class="code">/etc/init.d/tomcat7</p></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>PostgreSQL</th>
                        <td>
                            <p class="intro">The PostgreSQL 9.2 database server holds the JasperReports Server repository, and two sample databases used for the sample reports and analysis views.</p>
                            <table class="details">
                                <tr>
                                    <th><span>default login:</span></th>
                                    <td>postgres/postgres</td>
                                </tr>
                                <tr>
                                    <th><span>configuration:</span></th>
                                    <td><p class="code">/var/lib/pgsql9/data/postgresql.conf</p>
                                        <p class="code">/var/lib/pgsql9/data/pg_hba.conf</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>useful examples:</span></th>
                                    <td>
                                        <p class="code">[root@ip-10-0-0-1 bin]# /usr/bin/psql -U postgres</p>
                                        <p class="code">
                                            postgres=# \l<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List of databases<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Owner&nbsp;&nbsp;&nbsp;|&nbsp;Encoding&nbsp;|&nbsp;&nbsp;&nbsp;Collate&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Ctype&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Access&nbsp;privileges&nbsp;&nbsp;&nbsp;<br/>
                                            --------------+----------+----------+-------------+-------------+-----------------------<br/>
                                            &nbsp;foodmart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;postgres&nbsp;|&nbsp;UTF8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<br/>
                                            &nbsp;jasperserver&nbsp;|&nbsp;postgres&nbsp;|&nbsp;UTF8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<br/>
                                            &nbsp;postgres&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;postgres&nbsp;|&nbsp;UTF8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<br/>
                                            &nbsp;sugarcrm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;postgres&nbsp;|&nbsp;UTF8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<br/>
                                        <p class="code">postgres=# \c jasperserver<br />
                                            You are now connected to database "jasperserver" as user "postgres".<br />
                                            jasperserver=# select * from jiuser;</p>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>start &amp; stop command line:</span></th>
                                    <td>
                                        <p class="code">service postgresql stop</p>
                                        <p class="code">service postgresql start</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>start &amp; stop configuration:</span></th>
                                    <td><p class="code">/etc/init.d/postgresql</p></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>Security Considerations</th>
                        <td>
                            <p class="intro">You must consider your own requirements when creating a production server. For example:</p>
                            <p class="intro">Close unneeded ports like PostgreSQL on 5432</p>
                            <p class="intro preList">Change default passwords!</p>
                            <ul style="margin:0 0 12px 48px; list-style-type:disc">
                                <li>PostgreSQL</li>
                                <li>JasperReports Server</li>
                            </ul>
                            <p class="intro">Configure the Tomcat server for https access only.</p>
                            <p class="intro">Take regular snapshots of EBS volumes.</p>
                        </td>
                    </tr>
                </table>
            </t:putAttribute>
        </t:insertTemplate>
    </t:putAttribute>
</t:insertTemplate>
