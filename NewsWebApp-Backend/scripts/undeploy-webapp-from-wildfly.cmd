@echo off

cd ..
call mvn clean install -P undeploy-webapp-from-wildfly

pause