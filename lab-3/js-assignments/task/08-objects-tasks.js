'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    Rectangle.prototype.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj)
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    const params = JSON.parse(json);
    return Object.setPrototypeOf(params, proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 * 
 */
const cssSelectorBuilder = {
    element: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.element(value);
    },

    id: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.id(value);
    },

    class: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.class(value);
    },

    attr: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.attr(value);
    },

    pseudoClass: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.pseudoClass(value);
    },

    pseudoElement: function(value) {
        let builder = new CssSelectorBuilder();
        return builder.pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.chain(combinator, selector2);
    }
}


const stages ={
    element: 0,
    id: 1,
    class: 2,
    attr: 3,
    pseudoClass: 4,
    pseudoElement: 5
}

const err_mess = {
            parts_error : 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
            pseudo_error: 'Element, id and pseudo-element should not occur more then one time inside the selector'}


function parse_selector_part(this_el, statement){
    if (this_el.stage > statement){
        throw new Error(err_mess['parts_error'])
    }
    return statement
}

function undefined_check(this_el, content, value){
    if (content){
        throw new Error(err_mess['pseudo_error']);
    }
    return value
}

class CssSelectorBuilder {
    constructor() {
        this.stage = stages.element;
        this.follow = [];
        this.content = {
            element: undefined,
            id: undefined,
            classes: [],
            attributes: [],
            pseudoClasses: [],
            pseudoElement: undefined
        }
    }

    element(value) {
        this.stage = parse_selector_part(this, stages.element)
        this.content.element = undefined_check(this, this.content.element, value)
        return this
    }

    id(value) {
        this.stage = parse_selector_part(this, stages.id)
        this.content.id = undefined_check(this, this.content.id, value)
        return this
    }

    class(value) {
        this.stage = parse_selector_part(this, stages.class)
        this.content.classes.push(value);
        return this;
    }

    attr(value) {
        this.stage = parse_selector_part(this, stages.attr)
        this.content.attributes.push(value);
        return this;
    }

    pseudoClass(value) {

        this.stage = parse_selector_part(this, stages.pseudoClass)
        this.content.pseudoClasses.push(value);
        return this;
    }

    pseudoElement(value) {
        this.stage = parse_selector_part(this, stages.pseudoElement)
        this.content.pseudoElement = undefined_check(this, this.content.pseudoElement, value)
        return this
    }


    stringify() {
        return (this.content.element !== undefined ? this.content.element : '') +
            (this.content.id !== undefined ? '#' + this.content.id : '') +
            (this.content.classes.length ? '.' + this.content.classes.join('.') : '') +
            (this.content.attributes.length ? this.content.attributes.map(elem => `[${elem}]`).join('') : '') +
            (this.content.pseudoClasses.length ? ':' + this.content.pseudoClasses.join(':') : '') +
            (this.content.pseudoElement !== undefined ? '::' + this.content.pseudoElement : '') +
            (this.follow.length ?
                this.follow.map(elem => ` ${elem.combinator} ` + elem.element.stringify()).join('') : '');
    }

    chain(combinator, chainable) {
        this.follow.push({combinator: combinator, element: chainable});
        return this;
    }
}


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
}
