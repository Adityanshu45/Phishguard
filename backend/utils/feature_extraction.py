import whois
from urllib.parse import urlparse
import pandas as pd

#extract features
def extract_feature(url):
    features={}
    parsed=urlparse(url)

    features['url_length'] = len(url)
    features['hostname_length'] = len(parsed.netloc)
    features['num_dots'] = url.count('.')
    features['has_https'] = int(url.lower().startswith('http'))
    features['has_ip'] = int(parsed.netloc.replace('.','').isdigit())

    keywords = ['login','secure','varify','account','update','free','bank']
    features['keyword_counts'] = sum(k in url.lower() for k in keywords)
    
    try:
        domain_info = whois.whois(parsed.netloc)
        if domain_info.creation_date:
            creation = domain_info.creation_date
            if isinstance(creation,list):
                creation = creation[0]
            features['domain_age'] = (pd.Timestamp.now()-pd.to_datetime(creation)).days
        else:
            features['domain_age'] = 0
    except:
        features['domain_age'] = 0
    return features
