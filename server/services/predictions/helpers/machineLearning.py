import numpy as np
import json
import sys
from sklearn.linear_model import LinearRegression


def main():
    x = np.array(json.loads(sys.argv[1])).reshape((-1, 1))
    y = np.array(json.loads(sys.argv[2]))

    model = LinearRegression()
    model.fit(x, y)
    model = LinearRegression().fit(x, y)

    r_sq = model.score(x, y)
    print(r_sq, model.coef_, model.intercept_)


if __name__ == '__main__':
    main()
