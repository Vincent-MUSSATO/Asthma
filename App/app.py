import webbrowser
from flask import Flask, request, render_template
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import logging
from flask import send_from_directory
import joblib

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Définition de l'url
def open_browser():
    url = "http://127.0.0.1:5000/"
    webbrowser.open_new(url)

# Chargement du fichier CSV source directement dans un DataFrame
fichier_csv = 'traitement_grav_final.csv'
fichier_source = pd.read_csv(fichier_csv)
X_columns = fichier_source.drop(['Gravité', 'Disease'], axis=1).columns

# Chargement des modèles
clf_disease = joblib.load('clf_disease.joblib')
clf_gravity = joblib.load('clf_gravity.joblib')

# Page d'accueil de l'application
@app.route('/')
def home():
    return render_template('Page.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Récupération des symptômes et traitements
    symptomes_recus = request.form.getlist('symptomes[]')

    # Récupération de l'âge et du genre
    genre = request.form['Genre']
    age = request.form['Age']

    try:
        age = int(age)
    except ValueError:
        return "Invalid input for age", 400

    # Insertion des données récupérées dans le DF de l'utilisateur    
    symptomes_df = pd.DataFrame(columns=X_columns)
    symptomes_df.loc[0] = [0] * len(X_columns)
    symptomes_df.at[0, 'Genre'] = int(genre)
    symptomes_df.at[0, 'Age'] = age
    
    for symptome in symptomes_recus:
        if symptome in symptomes_df.columns:
            symptomes_df.at[0, symptome] = 1

    # Nombre de symptômes
    symp = len(symptomes_recus)

    # Affichage du résultat en fonction de la prédiction
    pred_disease = clf_disease.predict(symptomes_df)
    # Crise
    if pred_disease[0] == 1:
        prediction_gravity = clf_gravity.predict(symptomes_df)
        # Faible
        if prediction_gravity[0] == "faible" and symp > 7:
            return render_template('resultat_faible_symp_trop.html', prediction=prediction_gravity[0])
        elif prediction_gravity[0] == "faible" and symp < 3:
            return render_template('resultat_faible_symp_peu.html', prediction=prediction_gravity[0])
        elif prediction_gravity[0] == "faible":
            return render_template('resultat_faible.html', prediction=prediction_gravity[0])
        # Moyenne        
        elif prediction_gravity[0] == "moyenne" and symp > 7:
            return render_template('resultat_moyenne_symp_trop.html', prediction=prediction_gravity[0])
        elif prediction_gravity[0] == "moyenne" and symp < 3:
            return render_template('resultat_moyenne_symp_peu.html', prediction=prediction_gravity[0])
        elif prediction_gravity[0] == "moyenne":
            return render_template('resultat_moyenne.html', prediction=prediction_gravity[0])
        # Elevée        
        elif prediction_gravity[0] == "élevée" and symp > 7:
            return render_template('resultat_élevée_symp_trop.html', prediction=prediction_gravity[0])
        else :
            return render_template('resultat_élevée.html', prediction=prediction_gravity[0])
    # Pas de crise        
    else:
        if symp < 3 and symp > 0 :
            return render_template('resultat_negatif_symp_peu.html', prediction="R.A.S")
        elif age > 20 and symp > 0 and symp < 8:
            return render_template('resultat_negatif_age.html', prediction="R.A.S", age=age)
        elif symp > 7:
            return render_template('resultat_negatif_symp_trop.html', prediction="R.A.S")
        else:
            return render_template('resultat_negatif.html', prediction="R.A.S")

# Autres pages
@app.route('/asthme')
def page_asthme():
    return render_template('Asthme.html')

@app.route('/Contact-Urgences')
def page_contact_urgence():
    return render_template('Contact.html')

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    open_browser()
