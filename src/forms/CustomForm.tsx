import { Link, useNavigate } from 'react-router-dom';
import styles from './forms.module.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../redux/dataSlice';
import * as Yup from 'yup';
import schema, { IFormErrors } from '../schema';
import { useAppSelector } from '../redux/store';
import getPasswordStrength from '../utils/passwordStrength';
import fileToBase64 from '../utils/fileToBase64';

const CustomForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [password, setPassword] = useState('');
  const countries = useAppSelector((state) => state.countries);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const formObject = {
      name: formData.get('name') as string,
      age: formData.get('age') !== '' ? Number(formData.get('age')) : undefined,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      image: await fileToBase64(formData.get('image') as File),
      country: formData.get('country') as string,
    };

    try {
      await schema.validate(formObject, { abortEarly: false });
      dispatch(addData({ data: formObject, formType: 'customForm' }));
      navigate('/');
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const formattedErrors: IFormErrors = {};
        validationErrors.inner.forEach((error) => {
          if (error.path !== undefined) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
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
        <div className={styles.formTitle}>CustomForm</div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div>
          <div className={styles.formField}>
            <label htmlFor="name">Name:</label>
            <input
              className={styles.formInput}
              placeholder="Input name"
              name="name"
              id="name"
            />
          </div>
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="age">Age:</label>
            <input
              className={styles.formInput}
              placeholder="Input age"
              name="age"
              id="age"
              type="number"
            />
          </div>
          {errors.age && <div className={styles.error}>{errors.age}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.formInput}
              placeholder="Input email"
              name="email"
              id="email"
            />
          </div>
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.formInput}
              placeholder="Input password"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
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
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <div className={styles.formField}>
            <label>Gender:</label>
            <span>
              <input type="radio" name="gender" value="male" />
              Male
            </span>
            <span>
              <input type="radio" name="gender" value="female" />
              Female
            </span>
          </div>
          {errors.gender && <div className={styles.error}>{errors.gender}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="terms">
              I accept Terms and Conditions agreement:
            </label>
            <input id="terms" type="checkbox" name="terms" />
          </div>
          {errors.terms && <div className={styles.error}>{errors.terms}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="image">Upload picture:</label>
            <input
              id="image"
              type="file"
              accept="image/jpeg, image/png"
              name="image"
            />
          </div>
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>
        <div>
          <div className={styles.formField}>
            <label htmlFor="country">Select country:</label>
            <input id="country" list="countries" name="country" />
            <datalist id="countries">
              {countries.map((country: string, index: number) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </div>
          {errors.country && (
            <div className={styles.error}>{errors.country}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomForm;
