

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TextField from "../../../js/components/MetaPortalPlayer/TextField"

describe("TextField", function() {
    //setup
    var fieldDef = {
            label: "Dit is een label",
            name: "testfield",
            input: {
                _value: "testValue"},
            _isreadonly:false,
            };

    describe("read enabled", function() {
        var field = shallow(<TextField definition={fieldDef}/>);
        var input = field.find('input');
        var span = field.find('span');

        fieldDef._isreadonly = true;

        it('should render the class correctly', function() {
        expect(field.hasClass('field')).to.be.true; 
        });

        it('should render the label correctly', function() {
            expect(field.find('label').text()).to.equal(fieldDef.label);
        });

        it('should render the input correctly', function() {
            expect(input.html()).to.equal('<input type="text" name="testfield" value="testValue"/>' );
        });

        it('should not render the span', function() {
            expect(field.find('span')).to.be.not.existing;
        })
    });

    describe("readonly", function() {
        fieldDef._isreadonly = true;
        var field = shallow(<TextField definition={fieldDef}/>);
        var input = field.find('input');
        var span = field.find('span');

        it('should render the class correctly', function() {
            expect(field.hasClass('field')).to.be.true; 
        });

        it('should render the label correctly', function() {
            expect(field.find('label').text()).to.equal(fieldDef.label);
        });  

        it('should not render the input', function() {
            expect(field.find('input')).to.be.not.existing;
        });

        it('should render the span correctly', function() {
            expect(field.find('span').html()).to.equal('<span>testValue</span>');
        })
    })
});

