import { apiClient, useMutation } from 'store/config';

import { IQuizSubmission, ISubmitQuizDto } from './quiz.types';

export const useSubmitQuiz = () =>
  useMutation<IQuizSubmission[], ISubmitQuizDto>({
    mutationFn: (block) => apiClient.post({ path: 'quiz/open/submit', body: block }),
  });
