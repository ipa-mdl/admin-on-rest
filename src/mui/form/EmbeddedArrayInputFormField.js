import React from 'react';
import { Field } from 'redux-form';

import Labeled from '../input/Labeled';
import isRequired from './isRequired';

/**
 * A helper Input component for EmbeddedArrayInput
 *
 * It's an alternative to FormField that provides the ability to prefix the source/name
 * with a string you provide
 *
 * @example
 *
 * <EmbeddedArrayInputFormField input={input} prefix={my_prefix} />
 *
 */
const EmbeddedArrayInputFormField = ({ input, prefix, resource, ...rest }) => {
    const alteredSource = `${prefix}.fields.${input.props.source}`.replace(
        /[^a-z.]/g,
        ''
    );

    if (input.props.addField) {
        if (input.props.addLabel) {
            return (
                <Field
                    {...rest}
                    {...input.props}
                    resource={resource}
                    name={`${prefix}.${input.props.source}`}
                    component={Labeled}
                    source={alteredSource}
                    isRequired={isRequired(input.props.validate)}
                >
                    {input}
                </Field>
            );
        }
        return (
            <Field
                {...rest}
                {...input.props}
                resource={resource}
                name={`${prefix}.${input.props.source}`}
                component={input.type}
                source={alteredSource}
                isRequired={isRequired(input.props.validate)}
            />
        );
    }
    if (input.props.addLabel) {
        return (
            <Labeled
                {...rest}
                resource={resource}
                source={alteredSource}
                isRequired={isRequired(input.props.validate)}
            >
                {input}
            </Labeled>
        );
    }
    return typeof input.type === 'string'
        ? input
        : React.cloneElement(input, {
              ...rest,
              resource: resource,
              source: `${prefix}.${input.props.source}`,
          });
};

export default EmbeddedArrayInputFormField;
