import { Link, useNavigate } from 'react-router-dom';
import styles from './forms.module.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { addData } from '../redux/dataSlice';
import IFormData from '../types';
import { InferType } from 'yup';
import schema, { ImageType } from '../schema';
import { yupResolver } from '@hookform/resolvers/yup';
import getPasswordStrength from '../utils/passwordStrength';
import fileToBase64 from '../utils/fileToBase64';

interface IFormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: NonNullable<'male' | 'female' | undefined>;
  terms: NonNullable<boolean | undefined>;
  image: NonNullable<ImageType | undefined>;
  country: string;
}

const HookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema), mode: 'all' });
  const password = watch('password', '');

  const onSubmit: SubmitHandler<InferType<typeof schema>> = async (
    data: IFormInputs,
  ) => {
    await schema.validate(data, { abortEarly: false });
    const formattedData: IFormData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      terms: data.terms,
      image: data.image ? String(data.image) : '',
      country: data.country,
    };

    dispatch(addData({ data: formattedData, formType: 'hookForm' }));
    console.log('Submitted:', formattedData);
    navigate('/');
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <Link to="/">
          <img
            src="/back-arrow-icon.svg"
            alt="arrow-icon"
            style={{ height: '20px' }}
          />
        </Link>
        <div className={styles.formTitle}>React-hook Form</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <div className={styles.formField}>
            <label htmlFor="name">Name:</label>
            <input
              className={styles.formInput}
              placeholder="Input name"
              {...register('name')}
              id="name"
            />
          </div>
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="age">Age:</label>
            <input
              className={styles.formInput}
              placeholder="Input age"
              type="number"
              {...register('age')}
              id="age"
            />
          </div>
          {errors.age && (
            <div className={styles.error}>{errors.age.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.formInput}
              placeholder="Input email"
              {...register('email')}
              id="email"
            />
          </div>
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.formInput}
              placeholder="Input password"
              type="password"
              {...register('password')}
              id="password"
            />
          </div>
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
          <div className={styles.passwordStrength}>
            <label>Password Strength: </label>
            <span className={styles.strengthIndicator}>
              {getPasswordStrength(password)}
            </span>
          </div>
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="confirmPassword">Password2:</label>
            <input
              className={styles.formInput}
              placeholder="Repeat password"
              type="password"
              {...register('confirmPassword')}
              id="confirmPassword"
            />
          </div>
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label>Gender:</label>
            <span>
              <input type="radio" {...register('gender')} value="male" />
              Male
            </span>
            <span>
              <input type="radio" {...register('gender')} value="female" />
              Female
            </span>
          </div>
          {errors.gender && (
            <div className={styles.error}>{errors.gender.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="terms">
              I accept Terms and Conditions agreement:
            </label>
            <input id="terms" type="checkbox" {...register('terms')} />
          </div>
          {errors.terms && (
            <div className={styles.error}>{errors.terms.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="image">Upload picture:</label>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, ref } }) => (
                <input
                  id="image"
                  type="file"
                  accept="image/jpeg, image/png"
                  ref={ref}
                  onChange={async (e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      const base64 = await fileToBase64(file);
                      onChange(base64);
                    }
                  }}
                />
              )}
            />
          </div>
          {errors.image && (
            <div className={styles.error}>{errors.image.message}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="country">Select country:</label>
            <input id="country" list="countries" {...register('country')} />
            <datalist id="countries">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </div>
          {errors.country && (
            <div className={styles.error}>{errors.country.message}</div>
          )}
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || !isDirty}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
