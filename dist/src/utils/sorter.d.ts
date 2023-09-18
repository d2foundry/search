/**
 * https://github.com/dimfeld/sorters
  MIT License
  Copyright (c) 2020 Daniel Imfeld

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */
export type AccessorFn<T> = (value: T) => any;
export type Accessor<T> = string | string[] | AccessorFn<T>;
export declare enum ValueType {
    Any = "any",
    String = "string",
    Number = "number",
    Date = "date"
}
export declare enum Nulls {
    /** Treat nulls as lower than any other values. This is the default setting. */
    Low = "low",
    /** Treat nulls as higher than any other values. */
    High = "high",
    /** Assume there are no nullish values in the data. This may cause exceptions if you are wrong. */
    None = "none"
}
export interface SortAccessorDefinition<T> {
    /** A function that returns a value to sort on, or a string/array path into the object */
    value: Accessor<T>;
    /** True to sort descending */
    descending?: boolean;
    /** Predefine the type of data for faster sorting. Using this will likely throw an exception if the data does not match the specified type. */
    type?: ValueType;
    /** Sort null/undefined values as lower than others (default), higher than others, or assume there aren't any. */
    nulls?: Nulls;
}
export type SortAccessor<T> = SortAccessorDefinition<T> | Accessor<T>;
export type CompareFn<T> = (a: T, b: T) => number;
export declare function sorter<T>(...accessors: SortAccessor<T>[]): CompareFn<T>;
export default sorter;
