#!/usr/bin/python -u
'''
Created on 5 Feb 2010

@author: ole
'''
import cgi

from pySimInterface.mainPage import mainPage

if __name__ == '__main__':
    form = cgi.FieldStorage()
    if form.has_key("submitButton"):
        print("Content-type: text/html")
        print("")
    a = mainPage( 2 )
    a.createHeader()
    a.addMainTabContainer()
    a.createFooter()