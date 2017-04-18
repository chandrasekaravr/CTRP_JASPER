FROM tomcat:7


# Install JDK and set JAVA_HOME to prepare for js-ant build
RUN apt-get update && apt-get install -y -q openjdk-7-jdk && rm -rf /var/lib/apt/lists/*
ENV JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/

RUN sed -i '/#JAVA_OPTS/aJAVA_OPTS="-Xms128m -Xmx1024m -XX:MaxPermSize=512m"' /usr/local/tomcat/bin/catalina.sh

COPY reports.zip /tmp
RUN unzip /tmp/reports.zip -d /tmp/
RUN ls /tmp
RUN mv /tmp/reports/* /usr/local/tomcat/webapps/
COPY jasperserver.license /usr/local/tomcat

CMD ["catalina.sh", "run"]
