import { slug } from 'github-slugger';

// Define the kebabCase function with type annotations
const kebabCase = (str: string): string => slug(str);

export default kebabCase;
