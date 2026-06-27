namespace GSecobat.Domain.Exceptions
{
    public static class Guard
    {
        public static T AgainstNull<T>(T? value, string message) where T : class
        {
            if (value == null)
                throw new BusinessException(message);

            return value;
        }

        public static void AgainstNull(object value, string message)
        {
            if (value == null)
                throw new BusinessException(message);
        }

        public static void AgainstNegative(decimal value, string message)
        {
            if (value < 0)
                throw new BusinessException(message);
        }

        public static void AgainstZero(decimal value, string message)
        {
            if (value == 0)
                throw new BusinessException(message);
        }

        public static void AgainstUpperTo(double value, double to, string message)
        {
            if (value > to)
                throw new BusinessException(message);
        }
    }
}
