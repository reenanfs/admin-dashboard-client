import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ValidationMessages } from 'constants/validationMessages';
import { ITask } from 'pages/home/homeTypes';

interface ITaskFormProps {
  onSubmit: SubmitHandler<ITask>;
  defaultValues: ITask;
}

const personValidationSchema = yup.object({
  name: yup.string().required(ValidationMessages.REQUIRED),
  role: yup.string().required(ValidationMessages.REQUIRED),
  email: yup
    .string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
});

const EditPersonForm = ({
  onSubmit,
  defaultValues,
}: ITaskFormProps): JSX.Element => {
  const { taskName } = defaultValues;

  const { formState } = useForm<ITask>({
    resolver: yupResolver(personValidationSchema),
    defaultValues: {
      taskName,
    },
  });
  console.log(!!formState);
  return <span></span>;
};

export default EditPersonForm;
