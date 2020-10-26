import Amplify from 'aws-amplify';
import awsConfig from '../aws-exports';

export function initAmplify(): void {
  Amplify.configure(awsConfig)
}
