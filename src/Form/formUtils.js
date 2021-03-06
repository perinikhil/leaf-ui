/* eslint-disable no-template-curly-in-string */
import yup from 'yup';

function inherits(ctor, superCtor, spec) {
  // eslint-disable-next-line no-param-reassign
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  Object.assign(ctor.prototype, spec);
}

function AmountSchema() {
  if (!(this instanceof AmountSchema)) return new AmountSchema();
  yup.mixed.call(this, { type: 'amount' });

  this.withMutation(() => {
    this.transform(function amountTransform(value) {
      if (this.isType(value)) {
        return value;
      }
      return NaN;
    });
  });
}

inherits(AmountSchema, yup.mixed, {
  _typeCheck(value) {
    return /^-?\d+(\.\d{2})?$/.test(value);
  },

  min(min, message = '${path} must be greater than or equal to ${min}') {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value) {
        return value == null || value >= this.resolve(min);
      },
    });
  },

  max(max, message = '${path} must be lesser than or equal to ${max}') {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value) {
        return value == null || value <= this.resolve(max);
      },
    });
  },

  lessThan(lessThan, message = '${path} must be lesser than ${lessThan}') {
    return this.test({
      message,
      name: 'lessThan',
      exclusive: true,
      params: { lessThan },
      test(value) {
        return value == null || value < this.resolve(lessThan);
      },
    });
  },

  moreThan(moreThan, message = '${path} must be greater than ${moreThan}') {
    return this.test({
      message,
      name: 'moreThan',
      exclusive: true,
      params: { moreThan },
      test(value) {
        return value == null || value > this.resolve(moreThan);
      },
    });
  },

  positive(msg = '${path} must be a positive amount') {
    return this.min(0, msg);
  },

  negative(msg = '${path} must be a negative amount') {
    return this.max(0, msg);
  },
});

export {
  AmountSchema,
};
