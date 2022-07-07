import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import axios from '../../../helpers/Axios';

export default function useDeleteRecording(recordId) {
  const queryClient = useQueryClient();

  return useMutation(
    () => axios.delete(`/recordings/${recordId}.json`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecordings');
        queryClient.invalidateQueries('getRoomRecordings');
        toast.success('Recording deleted');
      },
      onError: () => {
        toast.error('There was a problem completing that action. \n Please try again.');
      },
    },
  );
}
