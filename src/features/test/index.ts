import test from '@/widgets/test';
import t from '@/features/login';
import { testFn as testFn2 } from '@/features/test/test';

const testFn = () => {
  console.log('test', test);
  console.log('login', t);
  console.log('testFn2', testFn2);
};
