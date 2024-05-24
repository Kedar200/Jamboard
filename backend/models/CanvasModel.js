const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CanvasSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    viewAccess: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    editAccess: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    background: {
        type: String,
        default: 'white'
    },
    drawing: {
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAAD///+hoqOorKzj4+Pl5ubk5OTn5+iqq6uurrL////g4ODGx8itrrDu7u60tbZ3enx4eny0trbu7+/z8/Okpaejpaby8vP///+1trfg4OF3enx4e33g4uLFxsjGyMmtr7Ctr7Cur7HHyMnh4eJ4e33g4eG1trikpqekpafz8/Lv7++0trd4en20trfv7/Df4ODGx8jf3+BVWFtLT1FVWVtTVlk6PkE7P0JTV1k8QENLTlFLT1JVWVxTV1oAAABkRxW0AAAAM3RSTlMAAAAAAAAAAAAAEViVuS+r7/CsLi7Kyi4Qq1jw8FiVlbi5uJRY71eqyskuLqvvqi1XlFfwBlS2AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+MEBAcVE5CiQ1QAAACRSURBVAjXTc5nD4IwFIXhU7dQxIFaFAX3nrS0dfD/f5YNSvB+e5KbnBcAsWzqONS2CAxKLbcdcy463V6ZoOL1EymVklIPhlUwV8tHdjLxGUbjn4yDCaZxQRHCeaqc6hVhxv84BxXF83uBZVBwtQbz03xIbxhq3lZ/M9Ldvg7SOBxPwkQG50szq2ZXGkW3OzP4AEA8H1WamC2AAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA0LTA0VDExOjIxOjE5LTA0OjAwHnWHYQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNC0wNFQxMToyMToxOS0wNDowMG8oP90AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC'
    },
    image: {
        type: String,
    }
});

const CanvasModel = mongoose.model('Canvas', CanvasSchema);

module.exports = CanvasModel;